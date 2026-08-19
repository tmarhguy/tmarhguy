import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { collectImageRefs } from '../sync-writing-media.mjs';

const ROOT = resolve(process.cwd());
const WRITING_DIR = join(ROOT, 'content/writing');
const LOG_DIR = join(ROOT, 'log');

describe('sync-writing-media', () => {
  it('collects markdown, video, and frontmatter image paths', () => {
    const refs = collectImageRefs(`---
title: Fixture
image: '/images/logs/tomato_home_white.png'
---

![Black](/images/logs/tomato_home_black.png)

<video src="/images/logs/pcb_arrive.mp4" poster="/images/logs/pcb_arrive.webp" controls></video>
`);

    expect([...refs]).toEqual(
      expect.arrayContaining([
        '/images/logs/tomato_home_white.png',
        '/images/logs/tomato_home_black.png',
        '/images/logs/pcb_arrive.mp4',
        '/images/logs/pcb_arrive.webp',
      ]),
    );
  });

  it('has a committed log/ file for every /images/logs/ writing ref', () => {
    const missing: string[] = [];

    for (const filename of readdirSync(WRITING_DIR)) {
      if (!filename.endsWith('.md')) {
        continue;
      }

      const content = readFileSync(join(WRITING_DIR, filename), 'utf8');
      for (const publicPath of collectImageRefs(content)) {
        if (!publicPath.startsWith('/images/logs/')) {
          continue;
        }

        const source = join(LOG_DIR, publicPath.slice('/images/logs/'.length));
        if (!existsSync(source)) {
          missing.push(`${filename} → ${publicPath}`);
        }
      }
    }

    expect(missing).toEqual([]);
  });

  it('has a committed public/ file for every writing media ref', () => {
    const missing: string[] = [];
    const publicRoot = join(ROOT, 'public');

    for (const filename of readdirSync(WRITING_DIR)) {
      if (!filename.endsWith('.md')) {
        continue;
      }

      const content = readFileSync(join(WRITING_DIR, filename), 'utf8');
      for (const publicPath of collectImageRefs(content)) {
        const source = join(publicRoot, publicPath.replace(/^\//, ''));
        if (!existsSync(source)) {
          missing.push(`${filename} → ${publicPath}`);
        }
      }
    }

    expect(missing).toEqual([]);
  });
});
