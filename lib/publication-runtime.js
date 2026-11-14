import { put, get, head, BlobPreconditionFailedError } from '@vercel/blob';
import { readFileSync } from 'node:fs';
import { createPublicationService } from './publications.js';
import { readFreshBlob } from './blob-fresh-read.js';

const seed = JSON.parse(readFileSync(new URL('../assets/data/publications-legacy.json', import.meta.url), 'utf8'));
const store = {
  put,
  async get(pathname) {
    return readFreshBlob(pathname, { head, get });
  },
  isConflict(error) {
    return error instanceof BlobPreconditionFailedError || error?.name === 'BlobAlreadyExistsError' ||
      /already exists|precondition|etag.*match/i.test(error?.message || '');
  },
};
export const publications = createPublicationService(store, { seed });
export const publicationStorage = store;
