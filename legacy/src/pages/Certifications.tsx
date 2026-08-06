import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  featuredCertifications,
  getCertificationsByPlatform,
  platformGroups,
  type Certification,
  type PlatformGroup,
} from '../data/certifications';
import { FadeIn } from '../components/ui/FadeIn';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { setCanonical, setDocumentTitle, setMeta, setMetaProperty } from '../utils/seo';

type TabId = 'standout' | PlatformGroup;

const AUTOPLAY_INTERVAL_MS = 4500;

export const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('standout');
  const [standoutIndex, setStandoutIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const byPlatform = getCertificationsByPlatform();
  const activeCerts = activeTab === 'standout' ? featuredCertifications : byPlatform[activeTab];
  const isStandout = activeTab === 'standout';
  const currentIndex = isStandout ? standoutIndex : galleryIndex;
  const currentCert = activeCerts[currentIndex];

  const goNext = useCallback(() => {
    if (isStandout) {
      setStandoutIndex((i) => (i + 1) % activeCerts.length);
    } else {
      setGalleryIndex((i) => (i + 1) % activeCerts.length);
    }
  }, [isStandout, activeCerts.length]);

  const goPrev = useCallback(() => {
    if (isStandout) {
      setStandoutIndex((i) => (i - 1 + activeCerts.length) % activeCerts.length);
    } else {
      setGalleryIndex((i) => (i - 1 + activeCerts.length) % activeCerts.length);
    }
  }, [isStandout, activeCerts.length]);

  // Autoplay for standout
  useEffect(() => {
    if (activeTab !== 'standout') return;
    autoplayRef.current = setInterval(goNext, AUTOPLAY_INTERVAL_MS);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [activeTab, goNext]);

  // Reset gallery index when switching platform tabs
  useEffect(() => {
    if (activeTab !== 'standout') setGalleryIndex(0);
  }, [activeTab]);

  // Arrow key + Escape navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
  };

  useEffect(() => {
    setDocumentTitle('Certifications — Verified Credentials | Tyrone Marhguy');
    setMeta('description', 'Tyrone Marhguy certifications: Python, C, Java, MATLAB, Generative AI, Matrix Algebra, CAD (Onshape), Leadership, and more.');
    setCanonical('https://tmarhguy.com/certifications');
    setMetaProperty('og:title', 'Certifications — Verified Credentials | Tyrone Marhguy');
    setMetaProperty('og:description', 'From Python and C to Generative AI and CAD. Verified credentials from Coursera, Udemy, Duke, UPenn, Google, Dartmouth.');
    setMetaProperty('og:image', 'https://tmarhguy.com/images/tyrone.jpg');
    setMetaProperty('og:url', 'https://tmarhguy.com/certifications');
    setMeta('twitter:title', 'Certifications — Verified Credentials | Tyrone Marhguy');
    setMeta('twitter:description', 'Python, C, Java, MATLAB, Generative AI, CAD. Verified on Coursera, Udemy, and more.');
  }, []);

  const tabItems: { id: TabId; label: string; count?: number }[] = [
    { id: 'standout', label: 'Standout', count: featuredCertifications.length },
    ...platformGroups
      .filter(({ key }) => byPlatform[key].length > 0)
      .map(({ key, label }) => ({ id: key as TabId, label, count: byPlatform[key].length })),
  ];

  return (
    <div
      className="flex flex-col bg-bg-void overflow-hidden"
      style={{
        paddingTop: 'clamp(60px, 12vw, 80px)',
        minHeight: '100vh',
        height: '100dvh',
        boxSizing: 'border-box',
      }}
    >
      {/* Hero — compact */}
      <section
        className="text-center shrink-0"
        style={{ padding: '0.5rem clamp(1rem, 4vw, 2rem) 0.4rem', borderBottom: '1px solid #1e1e1a' }}
      >
        <div className="eyebrow mb-0.5 justify-center text-[0.55rem]">Credentials</div>
        <h1 className="font-display font-bold text-xl md:text-2xl text-text-primary leading-tight">
           Verified Credentials
        </h1>
        <p className="text-[0.75rem] text-cream-dim max-w-xl mx-auto line-clamp-1">
          From UPenn, Google Cloud, Dartmouth, and HKUST to Onshape CAD — all verifiable.
        </p>
      </section>

      {/* Main: sidebar + content — fills remaining space */}
      <div
        className="flex flex-col md:flex-row flex-1 min-h-0 gap-0 md:gap-6 overflow-hidden"
        style={{ paddingLeft: 'clamp(1rem, 4vw, 3rem)', paddingRight: 'clamp(1rem, 4vw, 3rem)' }}
      >
        {/* Vertical tabs — left sidebar */}
        <aside
          className="flex md:flex-col gap-0 border-b md:border-b-0 md:border-r border-border-subtle overflow-x-auto md:overflow-x-visible shrink-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabItems.map(({ id, label, count }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex md:flex-col items-center md:items-start gap-1 font-mono text-[0.65rem] tracking-[0.12em] uppercase transition-all duration-200 shrink-0 md:shrink"
                style={{
                  padding: '0.6rem 1rem',
                  minWidth: 'fit-content',
                  color: isActive ? '#0a0a08' : '#9e9282',
                  background: isActive ? '#c9a84c' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: '1px solid #1e1e1a',
                  borderRight: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#f0e8d5';
                    e.currentTarget.style.background = '#1e1e1a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#9e9282';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span>{label}</span>
                {count != null && (
                  <span className="font-display font-bold text-sm" style={{ color: 'inherit' }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
          <style>{`aside::-webkit-scrollbar { display: none; }`}</style>
        </aside>

        {/* Content area — gallery/carousel */}
        <main className="flex-1 flex flex-col items-center justify-center min-h-0 overflow-hidden px-4 py-2 md:px-6 md:py-3">
          <FadeIn key={activeTab}>
            <div
              className="relative w-full h-full max-w-2xl mx-auto select-none touch-pan-y flex flex-col items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Main image/card */}
              <button
                onClick={() => currentCert && setSelectedCert(currentCert)}
                className="block w-full text-left group flex-1 min-h-0 flex flex-col"
              >
                <div className="flex-1 min-h-0 bg-bg-deep border border-border-subtle overflow-hidden rounded flex items-center justify-center mb-2">
                  <ImageWithFallback
                    src={currentCert.image}
                    alt={currentCert.title}
                    className="max-w-full max-h-full object-contain group-hover:opacity-95 transition-opacity"
                    loading="eager"
                  />
                </div>
                <div className="font-mono text-[0.5rem] text-gold-dim tracking-[0.12em] uppercase truncate">
                  {currentCert.issuer}
                </div>
                <div className="font-display text-sm font-bold text-text-primary leading-tight">
                  {currentCert.featuredTitle ?? currentCert.title}
                </div>
                <div className="font-mono text-[0.6rem] text-cream-dim">{currentCert.date}</div>
              </button>

              {/* Prev/Next controls */}
              <button
                onClick={goPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 p-2 rounded-full bg-bg-void/90 border border-border-subtle text-cream-dim hover:text-gold-champagne hover:border-gold-dim transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 p-2 rounded-full bg-bg-void/90 border border-border-subtle text-cream-dim hover:text-gold-champagne hover:border-gold-dim transition-all"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>

              {/* Counter / dots */}
              <div className="flex justify-center gap-1.5 mt-2 shrink-0">
                {activeCerts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => (isStandout ? setStandoutIndex(i) : setGalleryIndex(i))}
                    className="w-1.5 h-1.5 rounded-full transition-all shrink-0"
                    style={{
                      background: i === currentIndex ? '#c9a84c' : '#2a2a24',
                      opacity: i === currentIndex ? 1 : 0.5,
                    }}
                    aria-label={`Go to item ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </main>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#111110', border: '1px solid #1e1e1a', borderRadius: '4px' }}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-cream-dim hover:text-cream transition-colors z-10"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="p-6 pt-14">
              <div className="font-mono text-[0.58rem] text-gold-champagne tracking-[0.2em] uppercase mb-2">
                {selectedCert.issuer}
                {selectedCert.platform && ` · ${selectedCert.platform}`}
              </div>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
                {selectedCert.title}
              </h2>
              <div className="font-mono text-[0.72rem] text-cream-dim mb-6">{selectedCert.date}</div>
              <div className="mb-6 rounded overflow-hidden border border-border-subtle">
                <ImageWithFallback
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto"
                />
              </div>
              {selectedCert.verifyUrl && (
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.1em] text-gold-champagne hover:text-gold-bright transition-colors no-underline uppercase"
                >
                  Verify certificate <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-center py-2 shrink-0">
        <Link
          to="/about"
          className="font-mono text-[0.6rem] tracking-[0.1em] text-gold-champagne hover:text-cream no-underline uppercase"
        >
          ← Back to About
        </Link>
      </div>
    </div>
  );
};
