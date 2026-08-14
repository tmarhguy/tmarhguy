import type { ReactNode } from 'react';

import { formatWritingDate } from '@/lib/log-content';

interface LetterheadProps {
  date: string;
  projectLabel: string;
  projectLink?: string;
  projectSite?: string;
  /** Index rows show a short project link; post pages show the full label. */
  variant?: 'index' | 'post';
  className?: string;
}

function ProjectAnchor({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <a
      href={href}
      className="writing-letterhead-link"
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

export default function Letterhead({
  date,
  projectLabel,
  projectLink,
  projectSite,
  variant = 'index',
  className,
}: LetterheadProps) {
  const isPost = variant === 'post';
  const classes = [
    'writing-letterhead',
    isPost ? 'writing-letterhead--row' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasSiteAndRepo = Boolean(
    projectSite && projectLink && projectSite !== projectLink,
  );
  const primaryHref = projectSite ?? projectLink;

  const projectNode = primaryHref ? (
    <>
      <ProjectAnchor href={primaryHref}>
        {isPost ? (
          <>
            {projectLabel}
            <span aria-hidden="true"> ↗</span>
          </>
        ) : (
          'Project ↗'
        )}
      </ProjectAnchor>
      {hasSiteAndRepo ? (
        <>
          <span className="writing-letterhead-separator" aria-hidden="true">
            ·
          </span>
          <ProjectAnchor href={projectLink!}>
            GitHub
            <span aria-hidden="true"> ↗</span>
          </ProjectAnchor>
        </>
      ) : null}
    </>
  ) : (
    <span className="writing-letterhead-label">
      {isPost ? projectLabel : 'Project'}
    </span>
  );

  const dateNode = (
    <time className="writing-letterhead-date" dateTime={date}>
      {formatWritingDate(date)}
    </time>
  );

  if (isPost) {
    return (
      <div className={classes}>
        {projectNode}
        <span className="writing-letterhead-separator" aria-hidden="true">
          ·
        </span>
        {dateNode}
      </div>
    );
  }

  return (
    <div className={classes}>
      {projectNode}
      {dateNode}
    </div>
  );
}
