import Link from 'next/link';

const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/Tyrone_Marhguy';

export default function References() {
  return (
    <div className="references">
      {/* The sticky index links to #references, so the section needs a
          heading to land on like every other one. */}
      <div className="title">
        <h2>References</h2>
      </div>
      <aside className="resume-public-story">
        <span className="home-section-kicker">Biography & public record</span>
        <h3>From Achimota to Penn.</h3>
        <p>
          The story behind my education, identity, and path into engineering.
        </p>
        <a href={WIKIPEDIA_URL} target="_blank" rel="noopener noreferrer">
          Explore the biography on Wikipedia
        </a>
        <Link href="/about/">Read my story</Link>
      </aside>
      <div className="references-copy">
        <p>
          Professional references available upon request. For press coverage and
          background, see my{' '}
          <a
            href={WIKIPEDIA_URL}
            className="references-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia article
          </a>
          .
        </p>
        <p className="references-contact">
          <Link href="/contact" className="references-link">
            Get in touch
          </Link>
        </p>
      </div>
    </div>
  );
}
