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

  it('falls back to the site share image when an entry has no article image', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'welcome-to-tomato-32' }),
    });

    expect(metadata.openGraph?.images).toEqual([
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Tyrone Marhguy — Computer Engineering Student at University of Pennsylvania',
      },
    ]);
    expect(metadata.twitter?.images).toEqual(['/og.png']);
  });
});
