import { createHash, createHmac, randomUUID } from 'node:crypto';
import sharp from 'sharp';

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const MAX_BODY_BYTES = 4_250_000;
const MAX_TIMESTAMP = 9_999_999_999_999;
const JSON_TYPE = 'application/json; charset=utf-8';

export class PhotoError extends Error {
  constructor(status, message, code = 'INVALID_REQUEST') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function fail(status, message, code) {
  throw new PhotoError(status, message, code);
}

function text(value, label, max, required = false) {
  if (value == null && !required) return '';
  if (typeof value !== 'string') fail(400, `${label} invalide.`);
  const clean = value.trim().replace(/[\u0000-\u001f\u007f]/g, ' ');
  if ((required && !clean) || clean.length > max) {
    fail(400, `${label} : ${required ? '1 à' : 'au maximum'} ${max} caractères.`);
  }
  return clean;
}

export function validateFields(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) fail(400, 'Envoi invalide.');
  if (body.website) fail(400, 'Cet envoi ne peut pas être accepté.');
  if (body.consent !== true) fail(400, 'Votre accord de publication est nécessaire.');
  const eventDate = text(body.eventDate, 'La date', 10, true);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || !Number.isFinite(Date.parse(eventDate)) ||
      new Date(eventDate).toISOString().slice(0, 10) !== eventDate ||
      eventDate < '1950-01-01' || eventDate > '2100-12-31') {
    fail(400, 'Choisissez une date valide pour cet événement.');
  }
  return {
    title: text(body.title, 'Le titre', 120, true),
    album: text(body.album, 'L’album', 80, true),
    eventDate,
    author: text(body.author, 'Le nom', 80) || 'La communauté ABSFJ',
  };
}

export async function prepareImage(dataURL) {
  if (typeof dataURL !== 'string' || dataURL.length > MAX_BODY_BYTES) {
    fail(413, 'La photo est trop volumineuse. Maximum : 3 Mo.');
  }
  const match = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/]+={0,2})$/.exec(dataURL);
  if (!match) fail(400, 'Utilisez une photo JPEG, PNG ou WebP.');
  const buffer = Buffer.from(match[2], 'base64');
  if (!buffer.length || buffer.length > MAX_IMAGE_BYTES) {
    fail(413, 'La photo est trop volumineuse. Maximum : 3 Mo.');
  }
  try {
    const image = sharp(buffer, { limitInputPixels: 40_000_000, failOn: 'warning', animated: false });
    const metadata = await image.metadata();
    const claimedFormat = match[1] === 'jpeg' ? 'jpeg' : match[1];
    if (metadata.format !== claimedFormat || !metadata.width || !metadata.height ||
        (metadata.pages || 1) > 1) {
      fail(400, 'Le fichier ne correspond pas à une photographie prise en charge.');
    }
    // Re-encode on the server: no source metadata, scripts, or original filename is published.
    const { data, info } = await image.rotate()
      .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#fffdf8' })
      .jpeg({ quality: 84, progressive: true })
      .toBuffer({ resolveWithObject: true });
    return { buffer: data, width: info.width, height: info.height };
  } catch (error) {
    if (error instanceof PhotoError) throw error;
    fail(400, 'Cette photo est illisible ou dépasse 40 mégapixels. Choisissez une autre image.');
  }
}

export async function readBody(request) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    fail(415, 'Le formulaire doit être envoyé au format JSON.');
  }
  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_BODY_BYTES) fail(413, 'L’envoi est trop volumineux.');
  const reader = request.body?.getReader();
  if (!reader) fail(400, 'Aucune photo reçue.');
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        fail(413, 'L’envoi est trop volumineux.');
      }
      chunks.push(part.value);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch (error) {
    if (error instanceof PhotoError) throw error;
    fail(400, 'L’envoi est incomplet. Réessayez.');
  } finally {
    reader.releaseLock();
  }
}

function numericLimit(value, fallback, maximum) {
  const candidate = Number(value);
  return Number.isInteger(candidate) && candidate > 0 ? Math.min(candidate, maximum) : fallback;
}

function albumKey(album) {
  return createHash('sha256').update(album.normalize('NFC')).digest('hex').slice(0, 24);
}

export function metadataPaths(photo, timestamp) {
  const key = `${String(MAX_TIMESTAMP - timestamp).padStart(13, '0')}-${photo.id}.json`;
  return [`media/index/${key}`, `media/albums/${albumKey(photo.album)}/${key}`];
}

function isAlreadyExists(error) {
  return /already.?exists/i.test(`${error?.name || ''} ${error?.code || ''} ${error?.message || ''}`);
}

async function reserveSlot(storage, prefix, limit, reservationId, message) {
  const existing = await storage.list({ prefix, limit: 1000 });
  if (existing.hasMore || existing.blobs.length >= limit) fail(429, message, 'UPLOAD_LIMIT');
  const occupied = new Set(existing.blobs.map(blob => blob.pathname));
  for (let slot = 0; slot < limit; slot++) {
    const path = `${prefix}${String(slot).padStart(4, '0')}.json`;
    if (occupied.has(path)) continue;
    try {
      const reservation = await storage.put(path, JSON.stringify({ reservationId }), {
        access: 'public', contentType: JSON_TYPE, addRandomSuffix: false, allowOverwrite: false,
      });
      return reservation.url;
    } catch (error) {
      // Conditional creation also protects the quota when several requests arrive together.
      if (!isAlreadyExists(error)) throw error;
    }
  }
  fail(429, message, 'UPLOAD_LIMIT');
}

export function createPhotoService(storage, options = {}) {
  const env = options.env || process.env;
  const now = options.now || (() => Date.now());
  const uuid = options.uuid || randomUUID;

  async function removeQuietly(urls) {
    if (!urls.length) return;
    try { await storage.del(urls); } catch { console.error('ABSFJ media: cleanup failed'); }
  }

  async function listPhotos(url) {
    const rawLimit = url.searchParams.get('limit');
    const limit = numericLimit(rawLimit, 24, 48);
    const cursor = url.searchParams.get('cursor') || undefined;
    if (cursor && (cursor.length > 2048 || /[\u0000-\u001f]/.test(cursor))) fail(400, 'Page invalide.');
    const album = text(url.searchParams.get('album') || 'all', 'L’album', 80, true);
    const prefix = album === 'all' ? 'media/index/' : `media/albums/${albumKey(album)}/`;
    const result = await storage.list({ prefix, limit, ...(cursor ? { cursor } : {}) });
    const photos = await Promise.all(result.blobs.map(async blob => {
      const photo = await storage.readJSON(blob.url);
      // Return the public record only; quota identifiers never enter gallery responses.
      if (!photo || typeof photo.id !== 'string' || typeof photo.url !== 'string' ||
          !/^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//.test(photo.url)) {
        throw new Error('INVALID_PHOTO_RECORD');
      }
      return photo;
    }));
    return { photos, cursor: result.hasMore ? result.cursor || null : null, hasMore: result.hasMore };
  }

  async function uploadPhoto(request) {
    const url = new URL(request.url);
    const origin = request.headers.get('origin');
    if (request.headers.get('sec-fetch-site') === 'cross-site' ||
        (origin && origin !== url.origin)) {
      fail(403, 'Envoyez votre photo depuis le site de l’association.');
    }
    const body = await readBody(request);
    const fields = validateFields(body);
    const image = await prepareImage(body.image);
    const salt = env.MEDIA_RATE_SALT || env.BLOB_READ_WRITE_TOKEN;
    if (!salt) {
      console.error('ABSFJ media: missing rate-limit salt');
      fail(503, 'Le dépôt de photos est temporairement indisponible. Réessayez plus tard.', 'NOT_CONFIGURED');
    }
    const timestamp = now();
    const createdAt = new Date(timestamp).toISOString();
    const id = `${timestamp.toString(36)}-${uuid()}`;
    const ip = (request.headers.get('x-vercel-forwarded-for') ||
      request.headers.get('x-forwarded-for') || 'local').split(',')[0].trim();
    const ipHash = createHmac('sha256', salt).update(`${createdAt.slice(0, 10)}:${ip}`).digest('hex').slice(0, 32);
    const reservations = [];
    const published = [];
    try {
      reservations.push(await reserveSlot(storage, `media/quota/${createdAt.slice(0, 10)}/all/`,
        numericLimit(env.MEDIA_DAILY_LIMIT, 500, 1000), id,
        'La limite de photos du jour est atteinte. Retrouvez-nous demain.'));
      reservations.push(await reserveSlot(storage, `media/quota/${createdAt.slice(0, 10)}/hour-${createdAt.slice(11, 13)}/${ipHash}/`,
        numericLimit(env.MEDIA_HOURLY_LIMIT, 40, 1000), id,
        'Vous avez partagé beaucoup de photos. Réessayez dans une heure.'));
      const blob = await storage.put(`media/images/${id}.jpg`, image.buffer, {
        access: 'public', contentType: 'image/jpeg', addRandomSuffix: false, allowOverwrite: false,
        cacheControlMaxAge: 31_536_000,
      });
      published.push(blob.url);
      const photo = { id, url: blob.url, ...fields, createdAt, width: image.width, height: image.height };
      for (const path of metadataPaths(photo, timestamp)) {
        const record = await storage.put(path, JSON.stringify(photo), {
          access: 'public', contentType: JSON_TYPE, addRandomSuffix: false, allowOverwrite: false,
          cacheControlMaxAge: 31_536_000,
        });
        published.push(record.url);
      }
      return photo;
    } catch (error) {
      // No half-published item and no consumed quota after a failed upload.
      await removeQuietly([...published, ...reservations]);
      throw error;
    }
  }

  return async function handle(request) {
    try {
      let result;
      let status = 200;
      if (request.method === 'GET') result = await listPhotos(new URL(request.url));
      else if (request.method === 'POST') { result = { photo: await uploadPhoto(request) }; status = 201; }
      else return Response.json({ error: 'Méthode non autorisée.' }, {
        status: 405, headers: { Allow: 'GET, POST', 'Cache-Control': 'no-store' },
      });
      return Response.json(result, { status, headers: {
        'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
      } });
    } catch (error) {
      if (!(error instanceof PhotoError)) console.error('ABSFJ media: storage or processing failure', error?.name || 'Error');
      const status = error instanceof PhotoError ? error.status : 503;
      return Response.json({
        error: error instanceof PhotoError ? error.message : 'La médiathèque est momentanément indisponible. Réessayez dans quelques instants.',
        code: error instanceof PhotoError ? error.code : 'STORAGE_UNAVAILABLE',
      }, { status, headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '3600' } : {}) } });
    }
  };
}
