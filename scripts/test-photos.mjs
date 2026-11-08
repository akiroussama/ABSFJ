import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { createPhotoService, metadataPaths, prepareImage, validateFields } from '../lib/photos.js';
import api from '../api/photos.js';

const domain = 'https://test.public.blob.vercel-storage.com/';
const validImage = await sharp({ create: { width: 60, height: 40, channels: 3, background: '#a52f36' } })
  .jpeg().toBuffer();
const base = {
  title: 'Une rencontre à Ras Jbel', album: 'Team Building · Ras Jbel', eventDate: '2026-11-08',
  author: 'Test local', consent: true, website: '', image: `data:image/jpeg;base64,${validImage.toString('base64')}`,
};

function createStore() {
  const files = new Map();
  const store = {
    files,
    failPath: null,
    async put(pathname, body) {
      if (store.failPath && pathname.startsWith(store.failPath)) throw new Error('Storage failure');
      if (files.has(pathname)) { const error = new Error('This blob already exists'); error.name = 'BlobError'; throw error; }
      const url = domain + pathname;
      files.set(pathname, { body, url, pathname });
      return { url, pathname };
    },
    async list({ prefix, limit = 1000, cursor }) {
      const after = cursor ? Buffer.from(cursor, 'base64url').toString() : '';
      const values = [...files.values()].filter(file => file.pathname.startsWith(prefix) && file.pathname > after)
        .sort((a, b) => a.pathname.localeCompare(b.pathname));
      const blobs = values.slice(0, limit).map(({ url, pathname }) => ({ url, pathname }));
      const hasMore = values.length > limit;
      return { blobs, hasMore, cursor: hasMore ? Buffer.from(blobs.at(-1).pathname).toString('base64url') : undefined };
    },
    async readJSON(url) { return JSON.parse(files.get(url.slice(domain.length)).body); },
    async del(urls) { for (const url of [urls].flat()) files.delete(url.slice(domain.length)); },
  };
  return store;
}

function request(body = base, headers = {}) {
  return new Request('https://absfj.vercel.app/api/photos', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://absfj.vercel.app',
      'x-vercel-forwarded-for': '192.0.2.7', ...headers }, body: JSON.stringify(body),
  });
}

function service(store, extra = {}) {
  return createPhotoService(store, { env: { MEDIA_RATE_SALT: 'unit-test-secret', ...extra.env },
    now: () => Date.parse('2026-11-08T09:30:00Z'), ...extra });
}

test('framework-free API exposes the documented fetch handler', () => {
  assert.equal(typeof api.fetch, 'function');
});

test('server re-encodes, resizes and strips EXIF from images', async () => {
  const source = await sharp({ create: { width: 2600, height: 1300, channels: 3, background: '#263a31' } })
    .withExif({ IFD0: { Artist: 'Private author', Copyright: 'Private camera data' } }).jpeg().toBuffer();
  const image = await prepareImage(`data:image/jpeg;base64,${source.toString('base64')}`);
  const metadata = await sharp(image.buffer).metadata();
  assert.equal(image.width, 2000);
  assert.equal(image.height, 1000);
  assert.equal(metadata.exif, undefined);
  assert.equal(metadata.format, 'jpeg');
});

test('rejects calendar errors, absent consent, bots and oversized titles', () => {
  assert.throws(() => validateFields({ ...base, eventDate: '2026-02-30' }));
  assert.throws(() => validateFields({ ...base, consent: false }));
  assert.throws(() => validateFields({ ...base, website: 'bot.example' }));
  assert.throws(() => validateFields({ ...base, title: 'x'.repeat(121) }));
});

test('rejects disguised files and cross-site uploads before writing storage', async () => {
  const store = createStore();
  const handle = service(store);
  assert.equal((await handle(request({ ...base, image: 'data:image/png;base64,' + validImage.toString('base64') }))).status, 400);
  assert.equal((await handle(request({ ...base, image: 'data:image/jpeg;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==' }))).status, 400);
  assert.equal((await handle(request(base, { Origin: 'https://other.example' }))).status, 403);
  assert.equal(store.files.size, 0);
});

test('publishes one image and two indices, returning only public photo data', async () => {
  const store = createStore();
  const handle = service(store);
  const result = await handle(request());
  assert.equal(result.status, 201);
  const { photo } = await result.json();
  assert.equal(photo.title, base.title);
  assert.equal(photo.width, 60);
  assert.match(photo.url, /media\/images\/.*\.jpg$/);
  assert.deepEqual([...store.files.keys()].filter(path => path.startsWith('media/index/')).length, 1);
  const listed = await (await handle(new Request('https://absfj.vercel.app/api/photos'))).json();
  assert.deepEqual(listed.photos, [photo]);
  assert.equal(listed.hasMore, false);
  assert.equal(listed.cursor, null);
  assert.equal(JSON.stringify(listed).includes('192.0.2.7'), false);
});

test('newest-first pagination and album pagination skip no matching records', async () => {
  const store = createStore();
  let timestamp = Date.parse('2026-11-08T09:30:00Z');
  const handle = service(store, { now: () => timestamp++ });
  for (let i = 0; i < 5; i++) {
    const result = await handle(request({ ...base, title: `Photo ${i}`, album: i % 2 ? 'Autre' : 'Japon' }));
    assert.equal(result.status, 201);
  }
  const first = await (await handle(new Request('https://absfj.vercel.app/api/photos?limit=2'))).json();
  assert.deepEqual(first.photos.map(p => p.title), ['Photo 4', 'Photo 3']);
  assert.equal(first.hasMore, true);
  const second = await (await handle(new Request(`https://absfj.vercel.app/api/photos?limit=2&cursor=${encodeURIComponent(first.cursor)}`))).json();
  assert.deepEqual(second.photos.map(p => p.title), ['Photo 2', 'Photo 1']);
  const album = await (await handle(new Request('https://absfj.vercel.app/api/photos?limit=2&album=Japon'))).json();
  assert.deepEqual(album.photos.map(p => p.title), ['Photo 4', 'Photo 2']);
  const albumNext = await (await handle(new Request(`https://absfj.vercel.app/api/photos?limit=2&album=Japon&cursor=${encodeURIComponent(album.cursor)}`))).json();
  assert.deepEqual(albumNext.photos.map(p => p.title), ['Photo 0']);
});

test('quota persists across service instances, failed reservations are released', async () => {
  const store = createStore();
  const settings = { env: { MEDIA_RATE_SALT: 'test-salt', MEDIA_HOURLY_LIMIT: '1' } };
  assert.equal((await service(store, settings)(request())).status, 201);
  const rejected = await service(store, settings)(request());
  assert.equal(rejected.status, 429);
  assert.equal(rejected.headers.get('Retry-After'), '3600');
  assert.equal([...store.files.keys()].filter(p => p.includes('/all/')).length, 1);
});

test('concurrent reservation conflicts do not exceed the daily cap', async () => {
  const store = createStore();
  const handle = service(store, { env: { MEDIA_RATE_SALT: 'test-salt', MEDIA_DAILY_LIMIT: '1' } });
  const results = await Promise.all([handle(request()), handle(request())]);
  assert.deepEqual(results.map(r => r.status).sort(), [201, 429]);
  assert.equal([...store.files.keys()].filter(p => p.startsWith('media/images/')).length, 1);
});

test('partial storage failures remove the photo, indices and quota reservations', async () => {
  const store = createStore();
  store.failPath = 'media/albums/';
  const result = await service(store)(request());
  assert.equal(result.status, 503);
  assert.equal(store.files.size, 0);
  assert.equal((await result.json()).code, 'STORAGE_UNAVAILABLE');
});

test('oversized bodies and unsupported methods are rejected', async () => {
  const handle = service(createStore());
  const oversized = request(base, { 'content-length': '5000000' });
  assert.equal((await handle(oversized)).status, 413);
  const result = await handle(new Request('https://absfj.vercel.app/api/photos', { method: 'DELETE' }));
  assert.equal(result.status, 405);
  assert.equal(result.headers.get('Allow'), 'GET, POST');
});

test('metadata ordering decreases chronologically without a shared mutable index', () => {
  const old = metadataPaths({ id: 'old', album: 'Japon' }, 100)[0];
  const recent = metadataPaths({ id: 'recent', album: 'Japon' }, 200)[0];
  assert.equal(recent < old, true);
});
