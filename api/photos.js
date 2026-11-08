import { put, list, del } from '@vercel/blob';
import { createPhotoService } from '../lib/photos.js';

const fetchPhotos = createPhotoService({
  put,
  list,
  del,
  async readJSON(url) {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error('PHOTO_METADATA_UNAVAILABLE');
    return response.json();
  },
});

// Vercel's framework-free Node.js runtime supports the Web Request/Response API.
export default { fetch: fetchPhotos };
