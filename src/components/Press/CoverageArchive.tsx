'use client';

import { useState } from 'react';
import {
  filterPressEntries,
  formatPressDate,
  PRESS_MEDIA,
  PRESS_TOPICS,
} from '@/data/press';
import { externalAnchorProps } from '@/lib/external-link';
import SourcePreview from './SourcePreview';

export default function CoverageArchive() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('All');
  const [medium, setMedium] = useState('All formats');
  const [newestFirst, setNewestFirst] = useState(true);
  const entries = filterPressEntries(query, topic, newestFirst, medium);
  const years = [...new Set(entries.map((entry) => entry.date.slice(0, 4)))];
  function reset() {
    setQuery('');
    setTopic('All');
    setMedium('All formats');
  }

  return (
    <section className="press-archive" aria-labelledby="press-archive-title">
      <div className="press-archive-heading">
        <h2 id="press-archive-title">Coverage</h2>
      </div>
      <div className="press-controls">
        <label className="press-search">
          Search coverage
          <input
            type="search"
            value={query}
            placeholder="Publisher, story, or year…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          Format
          <select
            value={medium}
            onChange={(event) => setMedium(event.target.value)}
          >
            {['All formats', ...PRESS_MEDIA].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Order
          <select
            value={newestFirst ? 'newest' : 'oldest'}
            onChange={(event) =>
              setNewestFirst(event.target.value === 'newest')
            }
          >
            <option value="oldest">Oldest first</option>
            <option value="newest">Newest first</option>
          </select>
        </label>
        <div className="press-topics" role="group" aria-label="Filter by topic">
          {['All', ...PRESS_TOPICS].map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={topic === item}
              onClick={() => setTopic(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="press-results-bar">
        <p className="sr-only" role="status" aria-live="polite">
          {entries.length ? 'Coverage updated' : 'No matching coverage'}
        </p>
        {(query || topic !== 'All' || medium !== 'All formats') && (
          <button type="button" onClick={reset}>
            Clear filters
          </button>
        )}
      </div>
      {entries.length === 0 ? (
        <div className="press-empty">
          <h3>No matching coverage</h3>
          <p>Try another publisher, year, or topic.</p>
          <button type="button" onClick={reset}>
            Show all coverage
          </button>
        </div>
      ) : (
        <div className="press-timeline-layout">
          <nav className="press-years" aria-label="Coverage years">
            <span>Jump to year</span>
            {years.map((year) => (
              <a href={`#press-${year}`} key={year}>
                {year}
              </a>
            ))}
          </nav>
          <div className="press-timeline">
            {years.map((year) => (
              <section
                className="press-year"
                key={year}
                aria-labelledby={`press-${year}`}
              >
                <header className="press-year-heading">
                  <h3 id={`press-${year}`}>{year}</h3>
                </header>
                <ol className="press-entries">
                  {entries
                    .filter((entry) => entry.date.startsWith(year))
                    .map((entry) => (
                      <li key={entry.id}>
                        <article className="press-entry">
                          <time dateTime={entry.date}>
                            {formatPressDate(entry.date)}
                          </time>
                          <div className="press-entry-content">
                            <SourcePreview
                              url={entry.url}
                              publisher={entry.publisher}
                            />
                            <div className="press-entry-body">
                              <p className="press-entry-meta">
                                <span>{entry.publisher}</span>
                                <span>{entry.format}</span>
                              </p>
                              <h4>
                                <a
                                  href={entry.url}
                                  {...externalAnchorProps(entry.url)}
                                >
                                  {entry.title}

                                  <span className="sr-only">
                                    {' '}
                                    (opens in new tab)
                                  </span>
                                </a>
                              </h4>
                              <p className="press-entry-summary">
                                {entry.summary}
                              </p>
                              {entry.related && (
                                <details className="press-related">
                                  <summary>Related coverage</summary>
                                  <ul>
                                    {entry.related.map((item) => (
                                      <li key={item.url}>
                                        <SourcePreview
                                          url={item.url}
                                          publisher={item.publisher}
                                        />
                                        <div>
                                          <span>
                                            {item.kind} · {item.publisher}
                                          </span>
                                          <a
                                            href={item.url}
                                            {...externalAnchorProps(item.url)}
                                          >
                                            {item.title}
                                            <span className="sr-only">
                                              {' '}
                                              (opens in new tab)
                                            </span>
                                          </a>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </details>
                              )}
                              {entry.note && (
                                <p className="press-source-note">
                                  {entry.note}
                                </p>
                              )}
                            </div>
                          </div>
                        </article>
                      </li>
                    ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
