import Link from 'next/link';

import { WIKIPEDIA_URL } from '@/data/contact';
import { externalAnchorProps } from '@/lib/external-link';

export default function References() {
  return (
    <div className="references">
      {/* The sticky index links to #references, so the section needs a
          heading to land on like every other one. */}
      <div className="title">
        <h2>References</h2>
      </div>
      <div className="references-copy">
        <p>
          Professional references available upon request. For press coverage and
          background, see my{' '}
          <a
            href={WIKIPEDIA_URL}
            className="references-link"
            {...externalAnchorProps(WIKIPEDIA_URL)}
          >
            Wikipedia article
          </a>
          .
        </p>
        <p className="references-contact">
          <Link href="/contact" className="references-link">
            Get in touch →
          </Link>
        </p>
      </div>
    </div>
  );
}
