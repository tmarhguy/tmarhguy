import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import PostContent from '../PostContent';

describe('PostContent', () => {
  it('renders measured local images during server rendering', () => {
    const html = renderToStaticMarkup(
      <PostContent
        content="![A social card](/og.png)"
        imageSizes={{ '/og.png': { width: 1200, height: 630 } }}
      />,
    );

    expect(html).toContain('alt="A social card"');
    expect(html).toContain('width="1200"');
    expect(html).toContain('height="630"');
  });

  it('opens external markdown links in a new tab', () => {
    const html = renderToStaticMarkup(
      <PostContent
        content="[Wikipedia](https://en.wikipedia.org/wiki/Tyrone_Marhguy) and [writing](/writing/)"
        imageSizes={{}}
      />,
    );

    expect(html).toContain('target="_blank"');
    expect(html).toContain('https://en.wikipedia.org/wiki/Tyrone_Marhguy');
    expect(html).not.toContain('href="/writing/" target="_blank"');
  });

  it('refuses to invent dimensions for a local image', () => {
    expect(() =>
      renderToStaticMarkup(<PostContent content="![Missing](/missing.png)" />),
    ).toThrow(
      'Missing measured dimensions for local article image: /missing.png',
    );
  });

  it('retains a fallback for remote images', () => {
    const html = renderToStaticMarkup(
      <PostContent content="![Remote](https://example.com/image.png)" />,
    );

    expect(html).toContain('width="1200"');
    expect(html).toContain('height="675"');
  });
});
