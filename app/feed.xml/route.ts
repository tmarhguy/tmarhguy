import { getAllLogs } from '@/lib/logs';
import { AUTHOR_NAME, SITE_URL } from '@/lib/utils';

export const dynamic = 'force-static';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRssDate(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00Z`);
  return date.toUTCString();
}

export async function GET() {
  const items = getAllLogs();

  const rssItems = items
    .map(
      (entry) => `
    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(`${SITE_URL}/writing/${entry.slug}/`)}</link>
      <description>${escapeXml(entry.description)}</description>
      <category>${escapeXml(entry.projectLabel)}</category>
      <pubDate>${formatRssDate(entry.date)}</pubDate>
      <guid isPermaLink="true">${escapeXml(`${SITE_URL}/writing/${entry.slug}/`)}</guid>
    </item>`,
    )
    .join('');

  const lastBuildDate = items[0]?.date
    ? formatRssDate(items[0].date)
    : new Date(0).toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(AUTHOR_NAME)} - Writing</title>
    <link>${SITE_URL}/writing/</link>
    <description>Writing on hardware projects by ${escapeXml(AUTHOR_NAME)}.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
