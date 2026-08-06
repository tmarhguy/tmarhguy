import { describe, expect, it } from 'vitest';

import { SITE_URL } from '@/lib/utils';
import sitemap from '../sitemap';

describe('sitemap', () => {
  it('uses trailing slashes for exported page routes', () => {
    const entries = sitemap();

    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: `${SITE_URL}/` }),
        expect.objectContaining({ url: `${SITE_URL}/about/` }),
        expect.objectContaining({ url: `${SITE_URL}/resume/` }),
        expect.objectContaining({ url: `${SITE_URL}/projects/` }),
        expect.objectContaining({ url: `${SITE_URL}/writing/` }),
        expect.objectContaining({ url: `${SITE_URL}/stats/` }),
        expect.objectContaining({ url: `${SITE_URL}/contact/` }),
      ]),
    );
  });

  it('does not invent modification dates for static pages', () => {
    const staticEntries = sitemap().filter(
      (entry) => !entry.url.startsWith(`${SITE_URL}/writing/`),
    );

    expect(
      staticEntries.every((entry) => entry.lastModified === undefined),
    ).toBe(true);
  });

  it('uses trailing slashes for log routes', () => {
    const entries = sitemap();
    const logEntries = entries.filter(
      (entry) =>
        entry.url.startsWith(`${SITE_URL}/writing/`) &&
        entry.url !== `${SITE_URL}/writing/`,
    );

    expect(logEntries.length).toBeGreaterThan(0);
    expect(logEntries.every((entry) => entry.url.endsWith('/'))).toBe(true);
  });
});
