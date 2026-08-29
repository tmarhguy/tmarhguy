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

  it('wraps markdown tables for shared prose styling', () => {
    const html = renderToStaticMarkup(
      <PostContent
        content={`| Metric | Value |\n| --- | --- |\n| WNS | **+1.552 ns** |`}
      />,
    );

    expect(html).toContain('class="prose-table-wrap"');
    expect(html).toContain('<table');
    expect(html).toContain('WNS');
  });

  it('renders writing videos muted so audio never plays', () => {
    const html = renderToStaticMarkup(
      <PostContent
        content={'<video src="/images/assembly/clip.mp4" controls></video>'}
      />,
    );

    expect(html).toContain('<video');
    expect(html).toContain('muted');
    expect(html).toMatch(/playsInline/i);
  });

  it('renders prose-compare blocks for before/after terminal snippets', () => {
    const html = renderToStaticMarkup(
      <PostContent
        content={
          '<ProseCompare><ProseCompareItem label="Before" tag="old">cd ~/projects/mango</ProseCompareItem></ProseCompare>'
        }
      />,
    );

    expect(html).toContain('class="prose-compare"');
    expect(html).toContain('cd ~/projects/mango');
    expect(html).not.toContain('dangerouslySetInnerHTML');
  });

  it('renders prose notes in roman type, not blockquote italics', () => {
    const html = renderToStaticMarkup(
      <PostContent
        content={
          '<ProseNote title="Why 32,768 GPR?">Tomato exposes the full SRAM depth.</ProseNote>'
        }
      />,
    );

    expect(html).toContain('class="prose-note"');
    expect(html).toContain('Why 32,768 GPR?');
    expect(html).toContain('Tomato exposes the full SRAM depth.');
    expect(html).not.toContain('<blockquote');
  });

  it('renders register-file flow, bitfield, and diagram components', () => {
    const html = renderToStaticMarkup(
      <PostContent
        content={[
          '<ProseFlow><ProseFlowStep label="32 GPR" detail="register:5"></ProseFlowStep><ProseFlowStep accent label="32768 GPR" detail="+ superbank:7"></ProseFlowStep></ProseFlow>',
          '<ProseBitfield caption="15-bit address"><ProseBitseg accent bits="7" label="superbank"></ProseBitseg><ProseBitseg bits="3" label="bank"></ProseBitseg><ProseBitseg bits="5" label="register"></ProseBitseg></ProseBitfield>',
          '<ProseMirrors></ProseMirrors>',
          '<ProseAddrPipe></ProseAddrPipe>',
        ].join('\n')}
      />,
    );

    expect(html).toContain('class="prose-flow"');
    expect(html).toContain('32768 GPR');
    expect(html).toContain('class="prose-bitfield"');
    expect(html).toContain('superbank');
    expect(html).toContain('class="prose-mirrors"');
    expect(html).toContain('Mirror A');
    expect(html).toContain('class="prose-addr"');
    expect(html).toContain('15-bit SRAM addr');
  });
});
