import Link from 'next/link';
import type { ReactNode } from 'react';

import profile from '@/data/profile.json';
import {
  getProjectAnchorHrefByTitle,
  TOMATO_REPO_URL,
  TOMATO_SITE_URL,
} from '@/data/projects';

import ThemePortrait from './ThemePortrait';

function ProjectLink({
  titleMatch,
  children,
}: {
  titleMatch: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={getProjectAnchorHrefByTitle(titleMatch)}
      className="hero-inline-link"
    >
      {children}
    </Link>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <h1 className="hero-title">
            <span className="hero-name">{profile.name}</span>
          </h1>

          <p className="hero-intro">
            I build computers from discrete transistors to tapeout — and I write
            the software to test, automate, and deploy them. Currently designing
            a{' '}
            <a
              href={TOMATO_SITE_URL}
              className="hero-inline-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              32-bit CPU
            </a>{' '}
            (
            <a
              href={TOMATO_REPO_URL}
              className="hero-inline-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            ) with a focus on flexible datapath control. Previously:{' '}
            <ProjectLink titleMatch="SRAM">full-custom 22nm SRAM</ProjectLink>,
            a <ProjectLink titleMatch="UDP">100 Mbps UDP/IP stack</ProjectLink>{' '}
            on Artix-7,{' '}
            <ProjectLink titleMatch="Mango">terminal toolbox</ProjectLink> so I
            never upload a PDF to a random website again. The builds are in my{' '}
            <Link href="/projects/" className="hero-inline-link">
              projects
            </Link>
            ; the roles, in my{' '}
            <Link href="/resume/" className="hero-inline-link">
              experience.
            </Link>
          </p>

          <div className="hero-cta">
            <Link href="/projects/" className="button">
              View Projects
            </Link>
            <Link href="/resume/" className="hero-resume-link">
              View Resume
              <span aria-hidden="true">→</span>
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
