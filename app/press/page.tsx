import type { Metadata } from 'next';
import Link from 'next/link';
import CoverageArchive from '@/components/Press/CoverageArchive';
import PublisherMark from '@/components/Press/PublisherMark';
import SourcePreview from '@/components/Press/SourcePreview';
import PageWrapper from '@/components/Template/PageWrapper';
import { WIKIPEDIA_URL } from '@/data/contact';
import { pressEntries } from '@/data/press';
import { externalAnchorProps } from '@/lib/external-link';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Press & interviews',
  description: 'News coverage, interviews, and features about Tyrone Marhguy.',
  path: '/press/',
});

export default function PressPage() {
  const featured = ['joy-engineering', 'bbc-appeal', 'dw', 'olympiads'].map(
    (id, index) => {
      const entry = pressEntries.find((item) => item.id === id)!;
      return (
        <article
          key={entry.id}
          className={index === 0 ? 'press-lead' : 'press-secondary'}
        >
          <div className="press-feature-link">
            <a
              href={entry.url}
              aria-label={`${entry.title} (opens in new tab)`}
              {...externalAnchorProps(entry.url)}
            >
              <SourcePreview
                url={entry.url}
                publisher={entry.publisher}
                imageOverride={
                  index === 0
                    ? '/images/projects/alu-demo-poster.jpg'
                    : index === 3
                      ? '/images/press-medal-award.png'
                      : undefined
                }
                video={
                  index === 0 ? '/images/projects/alu-demo.mp4' : undefined
                }
                eager
              />
            </a>
            <div className="press-feature-copy">
              <a href={entry.url} {...externalAnchorProps(entry.url)}>
                <p className="press-feature-meta">
                  <PublisherMark publisher={entry.publisher} />
                  <span>{entry.date.slice(0, 4)}</span>
                </p>
                <h2>
                  {index === 0
                    ? 'Building a computer brain from scratch'
                    : index === 1
                      ? 'Winning the right to attend Achimota'
                      : index === 2
                        ? 'Starting school after a court victory'
                        : 'National top scorer in the American Mathematics Olympiad'}
                </h2>
              </a>
              {index > 0 && (
                <p className="press-feature-caption">
                  <a href={entry.url} {...externalAnchorProps(entry.url)}>
                    {index === 1
                      ? 'A court victory against exclusion over my Rastafarian dreadlocks.'
                      : index === 2
                        ? 'Enrolling after the ruling, with exams already underway.'
                        : 'American Mathematics Olympiad gold and Vanda Science Olympiad silver.'}
                  </a>
                  {id === 'dw' && (
                    <>
                      {' '}
                      I later{' '}
                      <a
                        className="press-inline-related"
                        href={
                          pressEntries.find(
                            (item) => item.id === 'class-results',
                          )!.url
                        }
                        {...externalAnchorProps(
                          pressEntries.find(
                            (item) => item.id === 'class-results',
                          )!.url,
                        )}
                      >
                        topped my class in Physics and Elective Maths
                      </a>
                      .
                    </>
                  )}
                  {id === 'olympiads' && (
                    <>
                      {' '}
                      I also earned{' '}
                      <a
                        className="press-inline-related"
                        href={
                          pressEntries.find((item) => item.id === 'wassce')!.url
                        }
                        {...externalAnchorProps(
                          pressEntries.find((item) => item.id === 'wassce')!
                            .url,
                        )}
                      >
                        eight A1s in the 2023 WASSCE
                      </a>
                      .
                    </>
                  )}
                </p>
              )}
              {index === 0 && (
                <p className="press-feature-summary">
                  8-bit discrete transistor ALU · interactive board model.
                </p>
              )}
              <span className="sr-only"> (opens in new tab)</span>
            </div>
          </div>
        </article>
      );
    },
  );
  return (
    <PageWrapper>
      <div className="press-page">
        <header className="press-hero">
          <h1 className="page-title">Press & interviews</h1>
          <p>News coverage, interviews, and features.</p>
          <div className="press-hero-links">
            <a href={WIKIPEDIA_URL} {...externalAnchorProps(WIKIPEDIA_URL)}>
              Wikipedia profile
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <Link href="/about/">My story</Link>
          </div>
        </header>
        <section className="press-start" aria-label="Selected coverage">
          <div className="press-featured">
            {featured[0]}
            <div className="press-supporting">{featured.slice(1)}</div>
          </div>
        </section>
        <CoverageArchive />
      </div>
    </PageWrapper>
  );
}
