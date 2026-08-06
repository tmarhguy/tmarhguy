import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import Letterhead from '@/components/Writing/Letterhead';
import PostContent from '@/components/Writing/PostContent';
import PostNav from '@/components/Writing/PostNav';
import ReadingProgress from '@/components/Writing/ReadingProgress';
import {
  type ImageSize,
  readImageSize,
  readPostImageSizes,
} from '@/lib/imageSize';
import {
  getAdjacentLogs,
  getLogBySlug,
  getLogSlugs,
  type LogEntry,
} from '@/lib/logs';
import { sharedOpenGraph, sharedTwitter } from '@/lib/metadata';
import {
  breadcrumbNode,
  HOME_URL,
  webPageNode,
  writingEntryNode,
} from '@/lib/schema';
import { SITE_URL } from '@/lib/utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface EntryImage extends ImageSize {
  alt: string;
  url: string;
}

function getEntryImage(entry: LogEntry): EntryImage | undefined {
  if (!entry.image || !entry.imageAlt) {
    return undefined;
  }

  return {
    ...readImageSize(entry.image),
    alt: entry.imageAlt,
    url: new URL(entry.image, SITE_URL).toString(),
  };
}

export function generateStaticParams() {
  return getLogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLogBySlug(slug);

  if (!entry) {
    return { title: 'Article Not Found' };
  }

  const url = `${SITE_URL}/writing/${entry.slug}/`;
  const image = getEntryImage(entry);
  const articleImage = image
    ? {
        images: [
          {
            url: image.url,
            width: image.width,
            height: image.height,
            alt: image.alt,
          },
        ],
      }
    : {};

  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: url },
    openGraph: {
      ...sharedOpenGraph,
      type: 'article',
      title: entry.title,
      description: entry.description,
      url,
      publishedTime: entry.date,
      ...articleImage,
    },
    twitter: {
      ...sharedTwitter,
      title: entry.title,
      description: entry.description,
      ...(image ? { images: ['/og.png'] } : {}),
    },
  };
}

export default async function WritingEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getLogBySlug(slug);

  if (!entry) {
    notFound();
  }

  const entryUrl = `${SITE_URL}/writing/${entry.slug}/`;
  const writingUrl = `${SITE_URL}/writing/`;
  const imageSizes = readPostImageSizes(entry.content);
  const entryImage = getEntryImage(entry);
  const { previous, next } = getAdjacentLogs(slug);

  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          webPageNode({
            url: entryUrl,
            name: entry.title,
            description: entry.description,
            hasBreadcrumb: true,
          }),
          writingEntryNode(entry, entryImage),
          breadcrumbNode(entryUrl, [
            { name: 'Home', url: HOME_URL },
            { name: 'Writing', url: writingUrl },
            { name: entry.title, url: entryUrl },
          ]),
        ]}
      />
      <article className="post-page">
        <ReadingProgress />
        <header className="post-header">
          <Letterhead
            date={entry.date}
            projectLabel={entry.projectLabel}
            projectLink={entry.projectLink}
            variant="post"
            className="writing-letterhead--post"
          />
          <h1 className="post-title">{entry.title}</h1>
          <p className="post-description">{entry.description}</p>
        </header>
        <div className="post-content prose">
          <PostContent content={entry.content} imageSizes={imageSizes} />
        </div>
        <PostNav previous={previous} next={next} />
      </article>
    </PageWrapper>
  );
}
