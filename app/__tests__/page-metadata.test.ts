import { describe, expect, it } from 'vitest';

import profile from '@/data/profile.json';
import { getLogSlugs } from '@/lib/logs';
import { AUTHOR_NAME, SHARE_IMAGE_PATH, SITE_URL } from '@/lib/utils';
import { metadata as aboutMetadata } from '../about/page';
import { metadata as contactMetadata } from '../contact/page';
import { metadata as notFoundMetadata } from '../not-found';
import { metadata as projectsMetadata } from '../projects/page';
import { metadata as resumeMetadata } from '../resume/page';
import { metadata as statsMetadata } from '../stats/page';
import { generateMetadata as generateWritingMetadata } from '../writing/[slug]/page';
import { metadata as writingMetadata } from '../writing/page';

describe('page metadata', () => {
  it('builds the contact description from the shared profile email', () => {
    expect(contactMetadata.description).toContain(profile.email);
  });

  it.each([
    ['about', aboutMetadata, `${SITE_URL}/about/`],
    ['contact', contactMetadata, `${SITE_URL}/contact/`],
    ['projects', projectsMetadata, `${SITE_URL}/projects/`],
    ['resume', resumeMetadata, `${SITE_URL}/resume/`],
    ['stats', statsMetadata, `${SITE_URL}/stats/`],
    ['writing', writingMetadata, `${SITE_URL}/writing/`],
  ])('sets page-specific open graph metadata for %s', (_, metadata, url) => {
    expect(metadata.openGraph?.url).toBe(url);
    expect(metadata.openGraph?.description).toBe(metadata.description);
    expect(metadata.openGraph?.title).toBe(
      `${metadata.title} | ${AUTHOR_NAME}`,
    );
  });

  it.each([
    ['about', aboutMetadata],
    ['contact', contactMetadata],
    ['projects', projectsMetadata],
    ['resume', resumeMetadata],
    ['stats', statsMetadata],
    ['writing', writingMetadata],
  ])('sets page-specific twitter metadata for %s', (_, metadata) => {
    expect(metadata.twitter?.description).toBe(metadata.description);
    expect(metadata.twitter?.title).toBe(`${metadata.title} | ${AUTHOR_NAME}`);
  });

  it.each([
    ['about', aboutMetadata],
    ['contact', contactMetadata],
    ['projects', projectsMetadata],
    ['resume', resumeMetadata],
    ['stats', statsMetadata],
    ['writing', writingMetadata],
    ['404', notFoundMetadata],
  ])('declares the share card on %s', (_, metadata) => {
    const ogImages = metadata.openGraph?.images;
    expect(JSON.stringify(ogImages)).toContain(SHARE_IMAGE_PATH);
    expect(JSON.stringify(metadata.twitter?.images)).toContain(
      SHARE_IMAGE_PATH,
    );
  });

  it.each([
    ['about', aboutMetadata, `${SITE_URL}/about/`],
    ['contact', contactMetadata, `${SITE_URL}/contact/`],
    ['projects', projectsMetadata, `${SITE_URL}/projects/`],
    ['resume', resumeMetadata, `${SITE_URL}/resume/`],
    ['stats', statsMetadata, `${SITE_URL}/stats/`],
    ['writing', writingMetadata, `${SITE_URL}/writing/`],
  ])('declares a canonical url for %s', (_, metadata, url) => {
    expect(metadata.alternates?.canonical).toBe(url);
  });

  it('omits the canonical on 404, which has no stable url', () => {
    expect(notFoundMetadata.alternates?.canonical).toBeUndefined();
  });

  it('keeps the RSS alternate alongside the canonical on the writing index', () => {
    expect(writingMetadata.alternates?.types).toEqual({
      'application/rss+xml': '/feed.xml',
    });
  });

  it('declares a canonical url for writing entries', async () => {
    const [slug] = getLogSlugs();
    const metadata = await generateWritingMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/writing/${slug}/`);
  });

  it('declares the share card on writing entries without an article image', async () => {
    const metadata = await generateWritingMetadata({
      params: Promise.resolve({ slug: 'welcome-to-tomato-32' }),
    });

    expect(JSON.stringify(metadata.openGraph?.images)).toContain(
      SHARE_IMAGE_PATH,
    );
    expect(JSON.stringify(metadata.twitter?.images)).toContain(
      SHARE_IMAGE_PATH,
    );
  });

  it('uses the article image on writing entries that declare one', async () => {
    const metadata = await generateWritingMetadata({
      params: Promise.resolve({ slug: '2026-08-07-ordered-tomato' }),
    });

    expect(JSON.stringify(metadata.openGraph?.images)).toContain(
      '/images/kicad/07_alu/pcb/alu_8b_board.png',
    );
  });

  it('overrides 404 share metadata without inventing a canonical url', () => {
    expect(notFoundMetadata.openGraph?.url).toBeUndefined();
    expect(notFoundMetadata.openGraph?.description).toBe(
      notFoundMetadata.description,
    );
    expect(notFoundMetadata.openGraph?.title).toBe(
      `${notFoundMetadata.title} | ${AUTHOR_NAME}`,
    );
    expect(notFoundMetadata.twitter?.description).toBe(
      notFoundMetadata.description,
    );
    expect(notFoundMetadata.twitter?.title).toBe(
      `${notFoundMetadata.title} | ${AUTHOR_NAME}`,
    );
  });

  it('preserves the writing rss alternate', () => {
    expect(writingMetadata.alternates?.types?.['application/rss+xml']).toBe(
      '/feed.xml',
    );
  });
});
