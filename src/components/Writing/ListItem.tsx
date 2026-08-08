import Link from 'next/link';

import { formatWritingDate } from '@/lib/log-content';
import type { LogEntry } from '@/lib/logs';
import { externalAnchorProps } from '@/lib/external-link';

interface ListItemProps {
  entry: LogEntry;
}

export default function ListItem({ entry }: ListItemProps) {
  const { slug, title, description, date, projectLabel, projectLink } = entry;

  return (
    <article className="project-list-item writing-list-item">
      <div className="project-list-meta">
        <time className="project-list-date" dateTime={date}>
          {formatWritingDate(date)}
        </time>
        {projectLink ? (
          <a
            href={projectLink}
            className="writing-item-project-link"
            {...externalAnchorProps(projectLink)}
          >
            Project ↗
          </a>
        ) : (
          <span className="writing-item-project-label">{projectLabel}</span>
        )}
      </div>
      <div className="project-list-body">
        <h3 className="project-list-title">
          <Link href={`/writing/${slug}/`} className="writing-list-title-link">
            {title}
          </Link>
        </h3>
        <p className="project-list-desc">
          <Link href={`/writing/${slug}/`} className="writing-list-desc-link">
            {description}
          </Link>
        </p>
      </div>
    </article>
  );
}
