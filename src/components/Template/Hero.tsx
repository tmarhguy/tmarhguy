import Link from 'next/link';

import profile from '@/data/profile.json';

import HomeIntroduction from './HomeIntroduction';
import ThemePortrait from './ThemePortrait';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <h1 className="hero-title">
            <span className="hero-name">{profile.name}</span>
          </h1>

          <HomeIntroduction className="hero-intro" />

          <div className="hero-cta">
            <Link href="/projects/" className="button">
              View Projects
            </Link>
            <Link href="/resume/" className="hero-resume-link">
              View Resume
            </Link>
          </div>
        </div>

        <div className="hero-portrait">
          <ThemePortrait width={320} height={320} priority />
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true" />
    </section>
  );
}
