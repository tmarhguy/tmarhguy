import type { Metadata } from 'next';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import ListItem from '@/components/Writing/ListItem';
import { getLogsByProject } from '@/lib/logs';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
  WRITING_DESCRIPTION,
  writingCollectionNode,
} from '@/lib/schema';

const WRITING_URL = `${SITE_URL}/writing/`;

const writingMetadata = createPageMetadata({
  title: 'Writing',
  description: WRITING_DESCRIPTION,
  path: '/writing/',
});

export const metadata: Metadata = {
  ...writingMetadata,
  alternates: {
    ...writingMetadata.alternates,
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

export default function WritingPage() {
  const projectGroups = getLogsByProject();
  const latestEntry = projectGroups.flatMap((group) => group.entries)[0];

  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: WRITING_URL,
            name: 'Writing',
            description: WRITING_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          writingCollectionNode(latestEntry?.date),
          breadcrumbNode(WRITING_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Writing', url: WRITING_URL },
          ]),
        ]}
      />
      <article className="writing-page">
        <header className="writing-header">
          <div className="writing-header-row">
            <h1 className="page-title">Writing</h1>
            <a
              href="/feed.xml"
              className="writing-rss-link"
              title="RSS Feed"
              aria-label="RSS Feed"
            >
              RSS
            </a>
          </div>
          <p className="page-subtitle">
            Build notes from the bench — grouped by project, newest first.
          </p>
        </header>

        {projectGroups.map((group) => (
          <section
            key={group.project}
            className="writing-group projects-list-section"
            aria-labelledby={`writing-${group.project}`}
          >
            <h2
              id={`writing-${group.project}`}
              className="projects-section-title"
            >
              {group.projectLabel}
            </h2>
            <div className="project-list writing-list">
              {group.entries.map((entry) => (
                <ListItem entry={entry} key={entry.slug} />
              ))}
            </div>
          </section>
        ))}
      </article>
    </PageWrapper>
  );
}
