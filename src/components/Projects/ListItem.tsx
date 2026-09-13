import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/data/projects';
import { getProjectSlug } from '@/data/projects';
import { externalAnchorProps } from '@/lib/external-link';
import { getWritingSectionHref, projectHasWriting } from '@/lib/logs';

interface ListItemProps {
  data: Project;
  /** Inverted rank number (highest first) — rendered as "N." before the title */
  number?: number;
}

export default function ListItem({ data, number }: ListItemProps) {
  const { title, link, site, period, date, desc, tech, highlight, logProject } =
    data;
  const writingHref =
    logProject && projectHasWriting(logProject)
      ? getWritingSectionHref(logProject)
      : null;
  const hasSiteAndRepo = Boolean(site && link && site !== link);
  const titleHref = site ?? link;

  return (
    <article
      id={getProjectSlug(data)}
      className={`project-list-item ${data.image ? 'project-list-item--media' : 'project-list-item--text'} ${getProjectSlug(data) === 'tomato' ? 'project-list-item--flagship' : ''}`}
    >
      {data.video ? (
        <figure className="project-exhibit-media">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={data.videoPoster ?? data.image}
            aria-label={data.imageCaption ?? `${title} demo video`}
          >
            <source src={data.video} type="video/mp4" />
          </video>
          <figcaption>{data.imageCaption ?? data.subtitle}</figcaption>
        </figure>
      ) : (
        data.image && (
          <figure className="project-exhibit-media">
            <Image
              src={data.image}
              alt={data.imageCaption ?? `${title} project screenshot`}
              width={1200}
              height={750}
            />
            <figcaption>{data.imageCaption ?? data.subtitle}</figcaption>
          </figure>
        )
      )}
      <div className="project-list-meta">
        <time className="project-list-date" dateTime={date}>
          {period}
        </time>
        {writingHref ? (
          <Link href={writingHref} className="project-list-log-link">
            Log
          </Link>
        ) : null}
      </div>
      <div className="project-list-body">
        <h3 className="project-list-title">
          {number !== undefined && (
            <span className="project-list-number" aria-hidden="true">
              {number}.
            </span>
          )}
          {titleHref ? (
            <a
              href={titleHref}
              className="project-list-link"
              {...externalAnchorProps(titleHref)}
            >
              {title}
            </a>
          ) : (
            title
          )}
          {hasSiteAndRepo ? (
            <a
              href={link}
              className="project-list-aux-link"
              {...externalAnchorProps(link)}
            >
              GitHub
            </a>
          ) : null}
          {highlight && (
            <span className="project-highlight" title={highlight}>
              <span aria-hidden="true">★</span> {highlight}
            </span>
          )}
        </h3>
        <p className="project-list-desc">{desc}</p>
        {tech.length > 0 && (
          <p className="project-list-tech">{tech.join(' · ')}</p>
        )}
      </div>
    </article>
  );
}
