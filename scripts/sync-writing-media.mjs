#!/usr/bin/env node
/**
 * Copy article images referenced in content/writing/ into public/images/.
 * Sources (first hit wins): public (already synced), log/ for /images/logs/,
 * tomato/media, tools/media (mango paths), and sibling ../tomato/media when
 * clones live next to this repo.
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
const PUBLIC_IMAGES = resolve(ROOT, 'public/images');
const WRITING_DIR = resolve(ROOT, 'content/writing');

const MEDIA_ROOTS = [
  resolve(ROOT, 'tomato/media'),
  resolve(ROOT, '../tomato/media'),
];

const IMAGE_REF =
  /!\[[^\]]*]\((\/images\/[^)\s]+)\)|<img\b[^>]*\bsrc=["'](\/images\/[^"']+)["']|<video\b[^>]*\bsrc=["'](\/images\/[^"']+)["']|^image:\s*['"](\/images\/[^'"]+)['"]/gim;

/** Collect root-relative /images/... paths from Markdown, img, or video tags. */
export function collectImageRefs(markdown) {
  const refs = new Set();

  for (const match of markdown.matchAll(IMAGE_REF)) {
    const src = match[1] ?? match[2] ?? match[3] ?? match[4];
    if (src?.startsWith('/images/')) {
      refs.add(src);
    }
  }

  return refs;
}

function resolveSource(relative) {
  const destination = join(PUBLIC_IMAGES, relative);
  if (existsSync(destination)) {
    return destination;
  }

  // /images/logs/foo.png ← log/foo.png (Obsidian vault, committed)
  if (relative.startsWith('logs/')) {
    const candidate = join(ROOT, 'log', relative.slice('logs/'.length));
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  for (const root of MEDIA_ROOTS) {
    const candidate = join(root, relative);
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  // /images/mango/foo.png ← tools/media/foo.png
  if (relative.startsWith('mango/')) {
    const name = relative.slice('mango/'.length);
    for (const root of [
      resolve(ROOT, 'tools/media'),
      resolve(ROOT, '../tools/media'),
    ]) {
      const candidate = join(root, name);
      if (existsSync(candidate)) {
        return candidate;
      }
    }
  }

  return null;
}

/** Map /images/foo → a media tree (or keep public/) and copy into public/images/foo. */
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
    const destination = join(PUBLIC_IMAGES, relative);
    const source = resolveSource(relative);

    if (!source) {
      console.warn(`missing source media for ${publicPath}`);
      continue;
    }

    if (source === destination) {
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
