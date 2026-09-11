import type { Metadata } from 'next';
import Image from 'next/image';
import PublicStory from '@/components/About/PublicStory';

import AboutContent from '@/components/About/Sections';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { aboutMarkdown } from '@/data/about';
import profile from '@/data/profile.json';
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
      <section className="about-page about-editorial">
        <header className="about-editorial-hero">
          <div>
            <span className="home-section-kicker">Ghana / Philadelphia</span>
            <h1 className="page-title">About</h1>
            <p className="about-deck">
              A builder.
              <br />A student.
              <br />A story still unfolding.
            </p>
            <p>
              I’m Tyrone. I grew up in Ghana, found my way to Penn, and turned a
              dorm-room desk into a place to build a computer.
            </p>
          </div>
          <figure>
            <Image
              src="/images/home/dorm-work.webp"
              alt="Tyrone working at his dorm desk, surrounded by electronics and test equipment"
              width={1400}
              height={877}
              priority
            />
            <figcaption>
              Somewhere between a dorm room and a hardware lab.
            </figcaption>
          </figure>
        </header>
        <PublicStory />
        <AboutContent markdown={aboutMarkdown} />
      </section>
    </PageWrapper>
  );
}
