import type { Metadata } from 'next';

import AboutContent from '@/components/About/Sections';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { aboutMarkdown } from '@/data/about';
import { WIKIPEDIA_URL } from '@/data/contact';
import profile from '@/data/profile.json';
import { externalAnchorProps } from '@/lib/external-link';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  HOME_URL,
  profilePageNode,
  SITE_URL,
} from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const ABOUT_URL = `${SITE_URL}/about/`;

const ABOUT_DESCRIPTION = `Learn about ${AUTHOR_NAME} — ${profile.role} at ${profile.employer} working across hardware RTL and production software.`;

export const metadata: Metadata = createPageMetadata({
  title: 'About',
  description: ABOUT_DESCRIPTION,
  path: '/about/',
});

export default function AboutPage() {
  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          profilePageNode({
            url: ABOUT_URL,
            name: 'About',
            description: ABOUT_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(ABOUT_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'About', url: ABOUT_URL },
          ]),
        ]}
      />
      <section className="about-page">
        <header className="about-header">
          <h1 className="page-title">
            <a
              href={WIKIPEDIA_URL}
              className="page-title-link"
              {...externalAnchorProps(WIKIPEDIA_URL)}
            >
              About
            </a>
          </h1>
          <p className="about-wikipedia-note">
            Read more on{' '}
            <a href={WIKIPEDIA_URL} {...externalAnchorProps(WIKIPEDIA_URL)}>
              Wikipedia
              <span aria-hidden="true"> ↗</span>
            </a>
          </p>
        </header>
        <AboutContent markdown={aboutMarkdown} />
      </section>
    </PageWrapper>
  );
}
