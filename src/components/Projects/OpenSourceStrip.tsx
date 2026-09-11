import Image from 'next/image';
import type { ReactNode } from 'react';

import type {
  OpenSourceContribution,
  OpenSourcePull,
} from '@/data/open-source';
import {
  githubStargazersHref,
  githubStarsShieldSrc,
  OPEN_SOURCE_BUILD_LOG_HREF,
} from '@/data/open-source';

interface OpenSourceStripProps {
  contributions: OpenSourceContribution[];
  showEvidence?: boolean;
}

function pullForHighlight(
  text: string,
  pulls: OpenSourcePull[],
): OpenSourcePull | undefined {
  return pulls.find((pull) => text.includes(pull.label));
}

/** Renders `**payoff**` as `<strong>` and `==highlight==` as a mark. */
function emphasize(text: string, pulls: OpenSourcePull[]): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g).map((part, index) => {
    const highlighted = /^==([^=]+)==$/.exec(part);
    if (highlighted) {
      const content = highlighted[1];
      const pull = pullForHighlight(content, pulls);
      if (pull) {
        return (
          <a
            key={index}
            href={pull.href}
            className="projects-open-source-highlight"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        );
      }

      return (
        <mark key={index} className="projects-open-source-highlight">
          {content}
        </mark>
      );
    }

    const emphasized = /^\*\*([^*]+)\*\*$/.exec(part);
    return emphasized ? <strong key={index}>{emphasized[1]}</strong> : part;
  });
}

function trailingPulls(
  desc: string,
  pulls: OpenSourcePull[],
): OpenSourcePull[] {
  const highlights = [...desc.matchAll(/==([^=]+)==/g)].map(
    (match) => match[1],
  );

  return pulls.filter(
    (pull) => !highlights.some((highlight) => highlight.includes(pull.label)),
  );
}

export default function OpenSourceStrip({
  contributions,
  showEvidence = false,
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
      {showEvidence && (
        <div className="open-source-evidence">
          <figure>
            <a
              href="/images/open-source/librelane-3.0.8.png"
              aria-label="View full LibreLane release screenshot"
            >
              <Image
                src="/images/open-source/librelane-3.0.8.png"
                alt="LibreLane 3.0.8 release credits tmarhguy for the Yosys compatibility fix"
                width={1246}
                height={1199}
                sizes="(max-width: 735px) 100vw, 50vw"
              />
            </a>
            <figcaption>
              <a href="https://github.com/librelane/librelane/releases/tag/3.0.8">
                LibreLane · shipped in 3.0.8
              </a>
              <span>The compatibility fix, in the release notes.</span>
            </figcaption>
          </figure>
          <figure>
            <a
              href="/images/open-source/openroad-contribution-activity.png"
              aria-label="View full OpenROAD contribution screenshot"
            >
              <Image
                src="/images/open-source/openroad-contribution-activity.png"
                alt="OpenROAD contribution activity showing the LEF58 parser fix"
                width={2012}
                height={1084}
                sizes="(max-width: 735px) 100vw, 50vw"
              />
            </a>
            <figcaption>
              <a href="https://github.com/The-OpenROAD-Project/OpenROAD/pull/11107">
                OpenROAD · inside the parser
              </a>
              <span>The patch and its review, in the open.</span>
            </figcaption>
          </figure>
        </div>
      )}
      <ul className="projects-open-source-list">
        {contributions.map((contribution) => {
          const starsSrc = githubStarsShieldSrc(contribution.link);
          const stargazersHref = githubStargazersHref(contribution.link);
          const leftoverPulls = trailingPulls(
            contribution.desc,
            contribution.pulls,
          );

          return (
            <li key={contribution.slug} id={contribution.slug}>
              <span className="projects-open-source-name">
                <a
                  href={contribution.link}
                  className="projects-open-source-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contribution.title}
                </a>
                {starsSrc && stargazersHref && (
                  <a
                    href={stargazersHref}
                    className="projects-open-source-stars"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* GitHub shields are remote SVGs; next/image cannot size them. */}
                    {/* biome-ignore lint/performance/noImgElement: shields.io badge */}
                    <img
                      src={starsSrc}
                      alt={`${contribution.title} GitHub stars`}
                      height={20}
                    />
                  </a>
                )}
              </span>
              <span className="projects-open-source-sep" aria-hidden="true">
                {' '}
                —{' '}
              </span>
              <span className="projects-open-source-desc">
                {emphasize(contribution.desc, contribution.pulls)}
              </span>
              {leftoverPulls.length > 0 && (
                <span className="projects-open-source-pulls">
                  {leftoverPulls.map((pull, index) => (
                    <span key={pull.href}>
                      {index === 0 ? ' · ' : ' · '}
                      <a
                        href={pull.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pull.label}
                      </a>
                    </span>
                  ))}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
