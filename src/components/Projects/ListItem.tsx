import Link from 'next/link';

import type { Project } from '@/data/projects';
import { getProjectSlug } from '@/data/projects';
import { getWritingSectionHref, projectHasWriting } from '@/lib/logs';

interface ListItemProps {
  data: Project;
}

export default function ListItem({ data }: ListItemProps) {
  const { title, link, period, date, desc, tech, highlight, logProject } = data;
  const writingHref =
    logProject && projectHasWriting(logProject)
      ? getWritingSectionHref(logProject)
      : null;

  return (
    <article
      id={getProjectSlug(data)}
      className={`project-list-item${highlight ? ' project-list-item--standout' : ''}`}
    >
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
          {link ? (
            <a href={link} className="project-list-link">
              {title}
              <span className="project-list-affordance" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            title
          )}
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
