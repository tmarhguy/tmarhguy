import React from 'react';
import { Navigation } from './Navigation';
import { DocumentFab } from '../features/DocumentFab';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-bg-void flex flex-col">
      <Navigation />
      <DocumentFab />
      <main className="flex-grow">
        {children}
      </main>
      {/* Editorial contact strip footer — responsive padding + safe area */}
      <footer
        className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4"
        style={{
          paddingTop: 'clamp(1.5rem, 4vw, 2rem)',
          paddingBottom: 'max(env(safe-area-inset-bottom), clamp(1.5rem, 4vw, 2rem))',
          paddingLeft: 'max(env(safe-area-inset-left), clamp(1rem, 4vw, 3rem))',
          paddingRight: 'max(env(safe-area-inset-right), clamp(1rem, 4vw, 3rem))',
          borderTop: '1px solid #1e1e1a',
        }}
      >
        <div className="font-mono text-[0.65rem] sm:text-[0.7rem] tracking-[0.2em] text-cream-dim uppercase text-center sm:text-left">
          Tyrone Iras Marhguy · Penn Engineering · Philadelphia, PA
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-end">
          <a href="mailto:tmarhguy@seas.upenn.edu" className="font-mono text-[0.65rem] sm:text-[0.72rem] text-cream-dim no-underline tracking-[0.1em] transition-colors duration-200 hover:text-gold-champagne py-2 sm:py-0">
            tmarhguy@seas.upenn.edu
          </a>
          <a href="https://github.com/tmarhguy" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.65rem] sm:text-[0.72rem] text-cream-dim no-underline tracking-[0.1em] transition-colors duration-200 hover:text-gold-champagne py-2 sm:py-0">
            github.com/tmarhguy
          </a>
          <a href="https://linkedin.com/in/tmarhguy" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.65rem] sm:text-[0.72rem] text-cream-dim no-underline tracking-[0.1em] transition-colors duration-200 hover:text-gold-champagne py-2 sm:py-0">
            linkedin.com/in/tmarhguy
          </a>
        </div>
      </footer>
    </div>
  );
};
