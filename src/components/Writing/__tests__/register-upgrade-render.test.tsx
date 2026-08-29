import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import matter from 'gray-matter';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import PostContent from '../PostContent';

describe('Register Upgrade post render', () => {
  it('keeps all diagram pieces and a roman note callout', () => {
    const raw = readFileSync(
      resolve(process.cwd(), 'content/writing/2026-08-29-register-upgrade.md'),
      'utf8',
    );
    const { content } = matter(raw);
    const html = renderToStaticMarkup(createElement(PostContent, { content }));

    expect((html.match(/prose-flow__step(?![-\w])/g) || []).length).toBe(3);
    expect((html.match(/prose-bitfield__seg(?![-\w])/g) || []).length).toBe(8);
    expect(html).toContain('32,768 GPR');
    expect(html).toContain('class="prose-note"');
    expect(html).not.toContain('<blockquote');
    expect(html).toContain('Mirror C');
    expect(html).toContain('15-bit SRAM addr');
  });
});
