import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { SchemaGraph } from '@/components/Schema';
import Hero from '@/components/Template/Hero';
import HomeContributions from '@/components/Template/HomeContributions';
import PageWrapper from '@/components/Template/PageWrapper';
import TomatoFeature from '@/components/Template/TomatoFeature';
import { getHomeFeaturedItems } from '@/data/projects';
import { externalAnchorProps } from '@/lib/external-link';
import { formatDateCompact } from '@/lib/log-content';
import { getHomeRecentLogs } from '@/lib/logs';
import { HOME_URL, profilePageNode } from '@/lib/schema';
import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
};

export default function HomePage() {
  const featuredItems = getHomeFeaturedItems();
  const recentLogs = getHomeRecentLogs(3);

  return (
    <PageWrapper mainClassName="page-main--hero">
      <SchemaGraph
        nodes={[profilePageNode({ url: HOME_URL, name: AUTHOR_NAME })]}
      />
      <Hero />
      <TomatoFeature />
      <HomeContributions />
      <section className="home-projects" aria-labelledby="home-projects-title">
        <div className="home-section-header">
          <div>
            <span className="home-section-kicker">
              03 / More from the workbench
            </span>
            <h2 id="home-projects-title">Projects</h2>
          </div>
          <Link href="/projects/" className="home-section-all">
            View all
          </Link>
        </div>
        <div className="home-projects-list">
          {featuredItems.map((item) => {
            const content = (
              <>
                <Image
                  className="home-project-image"
                  src={item.image}
                  alt={item.imageAlt}
                  width={640}
                  height={400}
                />
                <span className="home-project-meta">{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </>
            );

            if (item.external) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="home-project-item"
                  {...externalAnchorProps(item.href)}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={item.title}
                href={item.href}
                className="home-project-item"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </section>
      <section className="home-writing" aria-labelledby="home-writing-title">
        <div className="home-section-header">
          <div>
            <span className="home-section-kicker">From the bench</span>
            <h2 id="home-writing-title">Recent writing</h2>
          </div>
          <Link href="/writing/" className="home-section-all">
            View all
          </Link>
        </div>
        <div className="home-writing-list">
          {recentLogs.map((entry) => (
            <Link
              key={entry.slug}
              href={`/writing/${entry.slug}/`}
              className="home-writing-item"
            >
              <span className="home-writing-meta">
                {formatDateCompact(entry.date)} · {entry.projectLabel}
              </span>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
