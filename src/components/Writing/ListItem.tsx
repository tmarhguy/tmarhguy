import Image from 'next/image';
import Link from 'next/link';

import { readImageSize } from '@/lib/imageSize';
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
    image,
    imageAlt,
  } = entry;
  const hasSiteAndRepo = Boolean(
    projectSite && projectLink && projectSite !== projectLink,
  );
  const primaryHref = projectSite ?? projectLink;
  const entryHref = `/writing/${slug}/`;
  // Small proof thumbnail beside the row, like the open-source ledger.
  // Server-rendered with measured dimensions so the row never shifts.
  const thumb =
    image && imageAlt ? { src: image, ...readImageSize(image) } : undefined;

  return (
    <article
      className={`project-list-item writing-list-item${thumb ? ' writing-list-item--with-thumb' : ''}`}
    >
      <div className="project-list-meta">
        <time className="project-list-date" dateTime={date}>
          {formatWritingDate(date)}
        </time>
        {hasSiteAndRepo ? (
          <>
            <ProjectMetaLink href={projectSite!} label="Site" />
            <ProjectMetaLink href={projectLink!} label="GitHub" />
          </>
        ) : primaryHref ? (
          <ProjectMetaLink href={primaryHref} label="Project" />
        ) : (
          <span className="writing-item-project-label">{projectLabel}</span>
        )}
      </div>
      <div className="project-list-body">
        {thumb && (
          <Link
            href={entryHref}
            className="writing-list-thumb"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={thumb.src}
              alt=""
              width={thumb.width}
              height={thumb.height}
              sizes="128px"
              loading="lazy"
            />
          </Link>
        )}
        <div className="writing-list-text">
          <h3 className="project-list-title">
            <Link href={entryHref} className="writing-list-title-link">
              {title}
            </Link>
          </h3>
          <p className="project-list-desc">
            <Link href={entryHref} className="writing-list-desc-link">
              {description}
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
