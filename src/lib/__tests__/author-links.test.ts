import { describe, expect, it } from 'vitest';

import { WIKIPEDIA_URL } from '@/data/contact';
import { linkAuthorNameInMarkdown } from '@/lib/author-links';

describe('linkAuthorNameInMarkdown', () => {
  it('links plain author name mentions', () => {
    expect(linkAuthorNameInMarkdown('Meet Tyrone Iras Marhguy today.')).toBe(
      `Meet [Tyrone Iras Marhguy](${WIKIPEDIA_URL}) today.`,
    );
  });

  it('does not double-link names already in markdown links', () => {
    const alreadyLinked = `[Tyrone Iras Marhguy](${WIKIPEDIA_URL})`;
    expect(linkAuthorNameInMarkdown(alreadyLinked)).toBe(alreadyLinked);
  });

  it('does not link names inside other markdown links', () => {
    const markdown =
      '[Read about Tyrone Marhguy](https://example.com/tyrone-marhguy)';
    expect(linkAuthorNameInMarkdown(markdown)).toBe(markdown);
  });
});
