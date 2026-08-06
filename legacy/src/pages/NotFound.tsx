import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div
      className="min-h-screen bg-bg-void flex flex-col items-center justify-center text-center"
      style={{ paddingTop: '60px', padding: '4rem 3rem' }}
    >
      <div className="max-w-md">
        <div className="font-mono text-[0.65rem] tracking-[0.25em] text-gold-dim uppercase mb-6">
          Error · 404
        </div>
        <div
          className="font-display font-black text-text-primary mb-4 leading-none"
          style={{ fontSize: 'clamp(6rem, 16vw, 10rem)' }}
        >
          404
        </div>
        <p className="text-[0.95rem] text-cream-dim leading-relaxed mb-8">
          This page doesn't exist — but the rest of the site does.
        </p>
        <Link
          to="/"
          className="font-mono text-[0.72rem] tracking-[0.12em] text-gold-champagne hover:text-cream transition-colors no-underline uppercase"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
};
