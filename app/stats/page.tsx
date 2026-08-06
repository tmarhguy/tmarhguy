import type { Metadata } from 'next';
import Awards from '@/components/Stats/Awards';
import BenchStats from '@/components/Stats/BenchStats';
import GitHubStats from '@/components/Stats/GitHubStats';
import Personal from '@/components/Stats/Personal';
import PageWrapper from '@/components/Template/PageWrapper';
import { createPageMetadata } from '@/lib/metadata';
import { AUTHOR_NAME } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Stats',
  description: `GitHub and site metrics for ${AUTHOR_NAME} and tmarhguy.com`,
  path: '/stats/',
});

export default function StatsPage() {
  return (
    <PageWrapper>
      <section className="stats-page">
        <header className="stats-header">
          <h1 className="stats-title">Stats</h1>
        </header>
        <div className="stats-content">
          <section aria-labelledby="stats-github-title">
            <h2 className="stats-section-title" id="stats-github-title">
              GitHub
            </h2>
            <GitHubStats />
          </section>
          <section aria-labelledby="stats-bench-title">
            <h2 className="stats-section-title" id="stats-bench-title">
              This site
            </h2>
            <BenchStats />
          </section>
          <section aria-labelledby="stats-personal-title">
            <h2 className="stats-section-title" id="stats-personal-title">
              Me
            </h2>
            <Personal />
          </section>
          <section aria-labelledby="stats-awards-title">
            <h2 className="stats-section-title" id="stats-awards-title">
              Awards
            </h2>
            <Awards />
          </section>
        </div>
      </section>
    </PageWrapper>
  );
}
