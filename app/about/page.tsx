import type { Metadata } from 'next';
import Image from 'next/image';

import AboutContent from '@/components/About/Sections';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { aboutMarkdown } from '@/data/about';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  HOME_URL,
  profilePageNode,
  SITE_URL,
} from '@/lib/schema';

const ABOUT_URL = `${SITE_URL}/about/`;

const ABOUT_DESCRIPTION =
  'Tyrone Marhguy is a Ghanaian Computer Engineering student at Penn. His story spans the Achimota admission case, academic awards, and building computers from first principles.';

export const metadata: Metadata = createPageMetadata({
  title: 'About Tyrone Marhguy',
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
            <p className="about-deck">From Ghana to Penn.</p>
            <p>
              I’m Tyrone Marhguy, a Computer Engineering student at the
              University of Pennsylvania. I grew up in Ghana and attended
              Achimota School after a court ruling upheld my right to study
              while keeping my dreadlocks. Today, I design hardware and write
              the software that runs on it.
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
            <figcaption>Working on Tomato at my desk at Penn.</figcaption>
          </figure>
        </header>
        <p>
          <a href="/press/">Press coverage and interviews</a>
        </p>
        <AboutContent markdown={aboutMarkdown} />
      </section>
    </PageWrapper>
  );
}
