import { describe, expect, it } from 'vitest';

import { externalAnchorProps, isExternalHref } from '@/lib/external-link';

describe('isExternalHref', () => {
  it('treats off-site http(s) links as external', () => {
    expect(isExternalHref('https://en.wikipedia.org/wiki/Tyrone_Marhguy')).toBe(
      true,
    );
    expect(isExternalHref('http://example.com')).toBe(true);
    expect(isExternalHref('//cdn.example.com/image.png')).toBe(true);
  });

  it('keeps same-site, hash, and mail links in-page', () => {
    expect(isExternalHref('/writing/')).toBe(false);
    expect(isExternalHref('#academics')).toBe(false);
    expect(isExternalHref('mailto:hello@example.com')).toBe(false);
    expect(isExternalHref('tel:+15551234567')).toBe(false);
    expect(isExternalHref('https://tmarhguy.com/about/')).toBe(false);
  });
});

describe('externalAnchorProps', () => {
  it('opens external links in a new tab', () => {
    expect(externalAnchorProps('https://github.com/tmarhguy')).toEqual({
      target: '_blank',
      rel: 'noopener noreferrer',
    });
  });

  it('does not add target for internal links', () => {
    expect(externalAnchorProps('/about/')).toEqual({});
    expect(externalAnchorProps('#intro')).toEqual({});
    expect(externalAnchorProps('mailto:hello@example.com')).toEqual({});
  });
});
