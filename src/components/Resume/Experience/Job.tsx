import dayjs from 'dayjs';

import type { Position } from '@/data/resume/work';

import JobSummary from './JobSummary';

/** How much weight a role carries on the timeline spine. */
export type JobTier = 'lead' | 'primary' | 'early';

interface JobProps {
  data: Position;
  tier?: JobTier;
}

export default function Job({ data, tier = 'primary' }: JobProps) {
  const {
    name,
    position,
    url,
    startDate,
    endDate,
    upcoming,
    summary,
    highlights,
  } = data;
  const isCurrent = !endDate && !upcoming;

  return (
    <article
      className={`jobs-container jobs-container--${tier}${
        isCurrent ? ' jobs-container--current' : ''
      }${upcoming ? ' jobs-container--upcoming' : ''}`}
    >
      <span className="job-marker" aria-hidden="true" />

      <p className="daterange">
        {upcoming && !endDate ? (
          <>
            <span className="daterange-starting">Starting </span>
            <time dateTime={startDate}>
              {dayjs(startDate).format('MMMM YYYY')}
            </time>
          </>
        ) : (
          <>
            <time dateTime={startDate}>
              {dayjs(startDate).format('MMMM YYYY')}
            </time>
            {/* The dash is decorative, so a screen reader would otherwise run the
            dates together as "March 2026 Present". */}
            <span className="daterange-sep" aria-hidden="true">
              –
            </span>
            <span className="sr-only"> to </span>
            {endDate ? (
              <time dateTime={endDate}>
                {dayjs(endDate).format('MMMM YYYY')}
              </time>
            ) : (
              <span className="daterange-present">Present</span>
            )}
          </>
        )}
      </p>

      <div className="job-body">
        <header>
          <h3>
            <a href={url} className="job-company">
              {name}
            </a>
            <span className="job-position">{position}</span>
          </h3>
        </header>
        {summary ? <JobSummary summary={summary} /> : null}
        {highlights ? (
          <ul className="points">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
