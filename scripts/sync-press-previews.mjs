import { readFile, writeFile } from 'node:fs/promises';

const catalogue = JSON.parse(
  await readFile(new URL('../src/data/press.json', import.meta.url), 'utf8'),
);
const urls = [
  ...new Set(
    catalogue.flatMap((entry) => [
      entry.url,
      ...(entry.related ?? []).map((item) => item.url),
    ]),
  ),
];
const manifestPath = new URL(
  '../src/data/press-previews.json',
  import.meta.url,
);
let previews = {};
try {
  previews = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch {}
const refresh = process.argv.includes('--refresh');
const decode = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
let cursor = 0;
async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    if (previews[url] && !refresh) continue;
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(12000),
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PortfolioPreview/1.0)',
          Accept: 'text/html',
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = (await response.text()).slice(0, 2_000_000);
      const meta = {};
      for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
        const attrs = Object.fromEntries(
          [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
            (m) => [m[1].toLowerCase(), decode(m[2] ?? m[3])],
          ),
        );
        const key = attrs.property ?? attrs.name;
        if (key && attrs.content) meta[key.toLowerCase()] = attrs.content;
      }
      const image =
        meta['og:image:secure_url'] ??
        meta['og:image'] ??
        meta['twitter:image'];
      const title = meta['og:title'] ?? '';
      if (
        !image ||
        /^(log in|login|sign in|facebook|instagram|tiktok|youtube)$/i.test(
          title.trim(),
        )
      )
        throw new Error('No article preview');
      const imageUrl = new URL(image, response.url);
      if (imageUrl.protocol !== 'https:') throw new Error('Non-HTTPS preview');
      previews[url] = { image: imageUrl.href, checked: '2026-10-01' };
      console.log(`Preview: ${new URL(url).hostname}`);
    } catch (error) {
      previews[url] = {
        image: null,
        checked: '2026-10-01',
        reason: error.message,
      };
    }
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
await writeFile(
  manifestPath,
  `${JSON.stringify(Object.fromEntries(urls.map((url) => [url, previews[url]])), null, 2)}\n`,
);
console.log(
  `${Object.values(previews).filter((item) => item.image).length}/${urls.length} publisher previews available.`,
);
