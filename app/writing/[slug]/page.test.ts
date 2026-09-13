import { describe, expect, it } from 'vitest';
import { SITE_URL } from '@/lib/utils';
import { generateMetadata } from './page';

describe('writing entry metadata', () => {
  it('uses a trailing-slash canonical URL for writing entries', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'welcome-to-tomato-32' }),
    });

    expect(metadata.openGraph?.url).toBe(
      `${SITE_URL}/writing/welcome-to-tomato-32/`,
    );
  });

  it('uses the article image when an entry declares one', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'welcome-to-tomato-32' }),
    });

    expect(metadata.openGraph?.images).toEqual([
      {
        url: `${SITE_URL}/images/home/dorm-work.webp`,
        width: 1400,
        height: 877,
        alt: 'Workbench with soldering tools and test gear',
      },
    ]);
    expect(metadata.twitter?.images).toEqual(['/og.png']);
  });
});
