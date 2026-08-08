#!/usr/bin/env node
/**
 * Copy article images referenced in content/writing/ from the Tomato media tree
 * into public/images/ so static export can measure and serve them.
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const MEDIA_SOURCE = resolve(ROOT, '../tomato/media');
const PUBLIC_IMAGES = resolve(ROOT, 'public/images');
const WRITING_DIR = resolve(ROOT, 'content/writing');

const IMAGE_REF =
  /!\[[^\]]*]\((\/images\/[^)\s]+)\)|<img\b[^>]*\bsrc=["'](\/images\/[^"']+)["']/gi;

/** Collect root-relative /images/... paths from Markdown or HTML img tags. */
export function collectImageRefs(markdown) {
  const refs = new Set();

  for (const match of markdown.matchAll(IMAGE_REF)) {
    const src = match[1] ?? match[2];
    if (src?.startsWith('/images/')) {
      refs.add(src);
    }
  }

  return refs;
}

/** Map /images/foo → ../tomato/media/foo and copy into public/images/foo. */
export function syncWritingMedia({ quiet = false } = {}) {
  if (!existsSync(WRITING_DIR)) {
    return 0;
  }

  const refs = new Set();
  for (const filename of readdirSync(WRITING_DIR)) {
    if (!filename.endsWith('.md')) {
      continue;
    }

    const content = readFileSync(join(WRITING_DIR, filename), 'utf8');
    for (const ref of collectImageRefs(content)) {
      refs.add(ref);
    }
  }

  let copied = 0;

  for (const publicPath of refs) {
    const relative = publicPath.slice('/images/'.length);
    const source = join(MEDIA_SOURCE, relative);
    const destination = join(PUBLIC_IMAGES, relative);

    if (!existsSync(source)) {
      console.warn(`missing source media for ${publicPath}: ${source}`);
      continue;
    }

    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(source, destination);
    copied += 1;

    if (!quiet) {
      console.log(`synced ${publicPath}`);
    }
  }

  return copied;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const copied = syncWritingMedia();
  console.log(`\nSynced ${copied} image(s) to public/images/`);
}
