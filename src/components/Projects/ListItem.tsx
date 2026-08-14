import Link from 'next/link';

import type { Project } from '@/data/projects';
import { getProjectSlug } from '@/data/projects';
import { externalAnchorProps } from '@/lib/external-link';
import { getWritingSectionHref, projectHasWriting } from '@/lib/logs';

interface ListItemProps {
  data: Project;
}

export default function ListItem({ data }: ListItemProps) {
  const { title, link, site, period, date, desc, tech, highlight, logProject } =
    data;
  const writingHref =
    logProject && projectHasWriting(logProject)
      ? getWritingSectionHref(logProject)
      : null;
  const hasSiteAndRepo = Boolean(site && link && site !== link);
  const titleHref = site ?? link;

  return (
    <article id={getProjectSlug(data)} className="project-list-item">
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
          {titleHref ? (
            <a
              href={titleHref}
              className="project-list-link"
              {...externalAnchorProps(titleHref)}
            >
              {title}
              <span className="project-list-affordance" aria-hidden="true">
                ↗
              </span>
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
              <span aria-hidden="true"> ↗</span>
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
