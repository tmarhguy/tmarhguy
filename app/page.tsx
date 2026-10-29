import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { SchemaGraph } from '@/components/Schema';
import Hero from '@/components/Template/Hero';
import HomeContributions from '@/components/Template/HomeContributions';
import PageWrapper from '@/components/Template/PageWrapper';
import TomatoFeature from '@/components/Template/TomatoFeature';
import { HOME_OPEN_SOURCE_FEATURE } from '@/data/open-source';
import {
  getHomeProjectItems,
  type HomeFeaturedItem,
  openVsxDownloadsShieldSrc,
  openVsxVersionShieldSrc,
} from '@/data/projects';
import { externalAnchorProps } from '@/lib/external-link';
import { formatDateCompact } from '@/lib/log-content';
import { getHomeRecentLogs } from '@/lib/logs';
import { HOME_URL, profilePageNode } from '@/lib/schema';
import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
};

function HomeProjectCard({ item }: { item: HomeFeaturedItem }) {
  const content = (
    <>
      {item.video ? (
        <video
          className="home-project-image"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={item.videoPoster ?? item.image}
          aria-label={item.imageAlt}
        >
          <source src={item.video} type="video/mp4" />
        </video>
      ) : (
        <Image
          className="home-project-image"
          src={item.image}
          alt={item.imageAlt}
          width={640}
          height={400}
        />
      )}
      <h3>{item.title}</h3>
      {item.openVsx ? (
        <span className="home-project-shields">
          {/* GitHub-style shields are remote SVGs; next/image cannot size them. */}
          {/* biome-ignore lint/performance/noImgElement: shields.io badge */}
          <img
            src={openVsxVersionShieldSrc(item.openVsx)}
            alt={`${item.title} Open VSX version`}
            height={20}
          />
          {/* biome-ignore lint/performance/noImgElement: shields.io badge */}
          <img
            src={openVsxDownloadsShieldSrc(item.openVsx)}
            alt={`${item.title} Open VSX downloads`}
            height={20}
          />
        </span>
      ) : null}
      <p>{item.desc}</p>
    </>
  );

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

export default function HomePage() {
  const projectItems = getHomeProjectItems();
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
          <span className="home-section-links">
            <Link
              href={HOME_OPEN_SOURCE_FEATURE.href}
              className="home-section-all"
            >
              Open source
            </Link>
            <Link href="/projects/" className="home-section-all">
              View all
            </Link>
          </span>
        </div>
        <div className="home-projects-list">
          {projectItems.map((item) => (
            <HomeProjectCard key={item.title} item={item} />
          ))}
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
