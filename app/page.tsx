import type { Metadata } from 'next';
import Link from 'next/link';

import { SchemaGraph } from '@/components/Schema';
import Hero from '@/components/Template/Hero';
import PageWrapper from '@/components/Template/PageWrapper';
import { getFeaturedProjects } from '@/data/projects';
import { externalAnchorProps } from '@/lib/external-link';
import { formatDateCompact } from '@/lib/log-content';
import { getAllLogs } from '@/lib/logs';
import { HOME_URL, profilePageNode } from '@/lib/schema';
import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
};

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const recentLogs = getAllLogs().slice(0, 3);

  return (
    <PageWrapper mainClassName="page-main--hero">
      <SchemaGraph
        nodes={[profilePageNode({ url: HOME_URL, name: AUTHOR_NAME })]}
      />
      <Hero />
      <section className="home-projects" aria-labelledby="home-projects-title">
        <div className="home-section-header">
          <div>
            <span className="home-section-kicker">Selected work</span>
            <h2 id="home-projects-title">Projects</h2>
          </div>
          <Link href="/projects/" className="home-section-all">
            View all
          </Link>
        </div>
        <div className="home-projects-list">
          {featuredProjects.map((project) => {
            const className = 'home-project-item';
            const content = (
              <>
                <span className="home-project-meta">{project.period}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </>
            );

            const href = project.site ?? project.link;
            if (href) {
              return (
                <a
                  key={project.title}
                  href={href}
                  className={className}
                  {...externalAnchorProps(href)}
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={project.title} className={className}>
                {content}
              </div>
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
