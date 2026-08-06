import Link from 'next/link';

import type { LogEntry } from '@/lib/logs';

interface PostNavProps {
  previous: LogEntry | null;
  next: LogEntry | null;
}

export default function PostNav({ previous, next }: PostNavProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="post-nav" aria-label="Post navigation">
      {previous ? (
        <Link
          href={`/writing/${previous.slug}/`}
          className="post-nav-link post-nav-link--previous"
          rel="prev"
        >
          <span className="post-nav-label">Previous</span>
          <span className="post-nav-title">{previous.title}</span>
        </Link>
      ) : (
        <span className="post-nav-spacer" aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={`/writing/${next.slug}/`}
          className="post-nav-link post-nav-link--next"
          rel="next"
        >
          <span className="post-nav-label">Next</span>
          <span className="post-nav-title">{next.title}</span>
        </Link>
      ) : (
        <span className="post-nav-spacer" aria-hidden="true" />
      )}
    </nav>
  );
}
