import type { ResumeOpenSourceEntry } from '@/data/resume/open-source';

import OpenSourceHighlight from './OpenSourceHighlight';

interface OpenSourceEntryProps {
  data: ResumeOpenSourceEntry;
}

export default function OpenSourceEntry({ data }: OpenSourceEntryProps) {
  return (
    <article className="jobs-container jobs-container--primary jobs-container--oss">
      <span className="job-marker" aria-hidden="true" />

      <p className="daterange">{data.period}</p>

      <div className="job-body">
        <header>
          <h3>
            <a
              href={data.link}
              className="job-company"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.title}
            </a>
          </h3>
        </header>
        <ul className="points">
          {data.highlights.map((highlight) => (
            <li key={highlight}>
              <OpenSourceHighlight highlight={highlight} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
