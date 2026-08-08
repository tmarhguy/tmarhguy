import { formatWritingDate } from '@/lib/log-content';
import { externalAnchorProps } from '@/lib/external-link';

interface LetterheadProps {
  date: string;
  projectLabel: string;
  projectLink?: string;
  /** Index rows show a short project link; post pages show the full label. */
  variant?: 'index' | 'post';
  className?: string;
}

export default function Letterhead({
  date,
  projectLabel,
  projectLink,
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

  const projectNode = projectLink ? (
    <a
      href={projectLink}
      className="writing-letterhead-link"
      {...externalAnchorProps(projectLink)}
    >
      {isPost ? (
        <>
          {projectLabel}
          <span aria-hidden="true"> ↗</span>
        </>
      ) : (
        'Project ↗'
      )}
    </a>
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
