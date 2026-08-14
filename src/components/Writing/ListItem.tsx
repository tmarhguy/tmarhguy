import Link from 'next/link';

import { formatWritingDate } from '@/lib/log-content';
import type { LogEntry } from '@/lib/logs';

interface ListItemProps {
  entry: LogEntry;
}

function ProjectMetaLink({ href, label }: { href: string; label: string }) {
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <a
      href={href}
      className="writing-item-project-link"
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </a>
  );
}

export default function ListItem({ entry }: ListItemProps) {
  const {
    slug,
    title,
    description,
    date,
    projectLabel,
    projectLink,
    projectSite,
  } = entry;
  const hasSiteAndRepo = Boolean(
    projectSite && projectLink && projectSite !== projectLink,
  );
  const primaryHref = projectSite ?? projectLink;

  return (
    <article className="project-list-item writing-list-item">
      <div className="project-list-meta">
        <time className="project-list-date" dateTime={date}>
          {formatWritingDate(date)}
        </time>
        {hasSiteAndRepo ? (
          <>
            <ProjectMetaLink href={projectSite!} label="Site ↗" />
            <ProjectMetaLink href={projectLink!} label="GitHub ↗" />
          </>
        ) : primaryHref ? (
          <ProjectMetaLink href={primaryHref} label="Project ↗" />
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
