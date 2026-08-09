import type { OpenSourceContribution } from '@/data/open-source';
import { OPEN_SOURCE_BUILD_LOG_HREF } from '@/data/open-source';

interface OpenSourceStripProps {
  contributions: OpenSourceContribution[];
}

export default function OpenSourceStrip({
  contributions,
}: OpenSourceStripProps) {
  if (contributions.length === 0) {
    return null;
  }

  return (
    <section
      className="projects-list-section projects-open-source"
      aria-labelledby="open-source-title"
    >
      <div className="projects-open-source-head">
        <h2 className="projects-section-title" id="open-source-title">
          Open source
        </h2>
        <a
          href={OPEN_SOURCE_BUILD_LOG_HREF}
          className="projects-open-source-log"
        >
          Build log
        </a>
      </div>
      <ul className="projects-open-source-list">
        {contributions.map((contribution) => (
          <li key={contribution.slug} id={contribution.slug}>
            <a
              href={contribution.link}
              className="projects-open-source-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {contribution.title}
            </a>
            <span className="projects-open-source-sep" aria-hidden="true">
              {' '}
              —{' '}
            </span>
            <span className="projects-open-source-desc">
              {contribution.desc}
            </span>
            {contribution.pulls.length > 0 && (
              <span className="projects-open-source-pulls">
                {contribution.pulls.map((pull, index) => (
                  <span key={pull.href}>
                    {index === 0 ? ' · ' : ' · '}
                    <a href={pull.href} target="_blank" rel="noopener noreferrer">
                      {pull.label}
                    </a>
                  </span>
                ))}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
