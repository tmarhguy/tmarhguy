#!/usr/bin/env node
/**
 * Regenerate raster favicons from public/images/favicon/favicon.svg.
 * Run after editing the SVG: node scripts/generate-favicon.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const FAVICON_DIR = join(ROOT, 'public/images/favicon');
const SVG_PATH = join(FAVICON_DIR, 'favicon.svg');
const svg = readFileSync(SVG_PATH);

const FALLBACK_SIZES = {
  'apple-icon.png': 192,
  'apple-icon-precomposed.png': 192,
  'apple-touch-icon.png': 180,
};

function sizeForFilename(filename) {
  const match = filename.match(/(\d+)x(\d+)/);
  if (match) {
    return Number.parseInt(match[1], 10);
  }

  return FALLBACK_SIZES[filename];
}

async function renderPng(size) {
  return sharp(svg).resize(size, size).png().toBuffer();
}

const pngFiles = readdirSync(FAVICON_DIR).filter((name) =>
  name.endsWith('.png'),
);

for (const filename of pngFiles) {
  const size = sizeForFilename(filename);
  if (!size) {
    console.warn(`skip ${filename}: could not infer size`);
    continue;
  }

  const output = join(FAVICON_DIR, filename);
  await sharp(svg).resize(size, size).png().toFile(output);
  console.log(`wrote ${filename} (${size}x${size})`);
}

const icon32 = await renderPng(32);

for (const destination of [
  join(FAVICON_DIR, 'favicon.ico'),
  join(ROOT, 'app/favicon.ico'),
]) {
  writeFileSync(destination, icon32);
  console.log(`wrote ${destination}`);
}

console.log('\nFavicon pack updated from favicon.svg');
