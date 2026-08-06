import { describe, expect, it } from 'vitest';

import { getAllLogs } from '@/lib/logs';
import { SITE_URL } from '@/lib/utils';

import { GET } from '../route';

function formatRssDate(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00Z`).toUTCString();
}

describe('feed.xml route', () => {
  it('uses canonical trailing-slash links for log pages', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(`${SITE_URL}/writing/`);
    expect(xml).toContain(`${SITE_URL}/writing/welcome-to-tomato-32/`);
  });

  it('keeps the feed self link file-like', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(`${SITE_URL}/feed.xml`);
    expect(xml).not.toContain(`${SITE_URL}/feed.xml/`);
  });

  it('derives lastBuildDate from the newest log entry', async () => {
    const [newest] = getAllLogs();
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(
      `<lastBuildDate>${formatRssDate(newest.date)}</lastBuildDate>`,
    );
  });
});
