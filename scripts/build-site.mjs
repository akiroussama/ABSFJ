import { cp, copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'public');
await mkdir(output, { recursive: true });
await cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
for (const name of ['index.html', 'mediatheque.html', 'projets.html', 'projet.html', 'bureau-publications.html']) {
  await copyFile(path.join(root, name), path.join(output, name));
}
console.log('ABSFJ: 5 pages and public assets prepared in public/. Server sources stay outside the public directory.');
