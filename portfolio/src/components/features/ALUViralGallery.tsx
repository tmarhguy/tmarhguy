import { useState, useCallback, useEffect, useRef } from 'react';
import { FadeIn } from '../ui/FadeIn';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Gallery images — must match files in public/alu-post-com-headlines/
const images = [
  'IMG_2101.jpg',
  'IMG_2185.jpg',
  'IMG_2186.jpg',
  'IMG_2187.jpg',
  'IMG_2080.jpg',
  'IMG_2089.jpg',
  'IMG_2093.jpg',
  'IMG_2094.jpg',
  'IMG_2095.jpg',
  'IMG_2096.jpg',
  'IMG_2098.jpg',
  'IMG_2099.jpg',
  'IMG_2100.jpg',
  'IMG_2102.jpg',
  'IMG_2118.jpg',
  'IMG_2119.jpg',
  'IMG_2121.jpg',
  'IMG_2122.jpg',
  'IMG_2150.jpg',
  'IMG_2151.jpg',
  'IMG_2152.jpg',
  'IMG_2153.jpg',
  'IMG_2154.jpg',
  'IMG_2155.jpg',
  'IMG_2156.jpg',
  'IMG_2157.jpg',
  'IMG_2158.jpg',
  'IMG_2161.jpg',
  'IMG_2162.jpg',
];

export const ALUViralGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    setHasInteracted(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const goPrev = useCallback(() => {
    setHasInteracted(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Auto-scroll thumbnails
  useEffect(() => {
    if (!hasInteracted) return;

    if (thumbnailContainerRef.current) {
      const activeThumb = thumbnailContainerRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex, hasInteracted]);

  return (
    <section style={{ padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem) clamp(3rem, 8vw, 6rem)', background: '#0a0a08', borderTop: '1px solid #1e1e1a' }}>
      <FadeIn>
        <div className="content-max-width mx-auto">
          <div className="text-center mb-10">
            <div className="font-mono text-[0.65rem] text-gold-dim tracking-[0.2em] uppercase mb-4">
              Community Response
            </div>
            <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
              Going Viral
            </h2>
            <p className="text-[0.95rem] text-cream-dim leading-relaxed max-w-2xl mx-auto">
              When I posted the completed ALU online, it exploded. The hardware community's response was overwhelming, leading to sponsorships from NEXTPCB and PCBWay for future iterations. Here is a snapshot of the reception.
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            
            {/* Main Interactive Viewer */}
            <div className="relative w-full aspect-[4/3] sm:aspect-video bg-[#111110] border border-border-subtle rounded-[4px] flex items-center justify-center overflow-hidden group shadow-2xl">
               <ImageWithFallback
                  key={currentIndex}
                  src={`/alu-post-com-headlines/${images[currentIndex]}`}
                  alt={`Response snapshot ${currentIndex + 1}`}
                  className="w-full h-full object-contain p-2 animate-in fade-in duration-500"
               />
               
               {/* Controls — always visible on touch (no hover), 44px touch target */}
               <button
                  onClick={goPrev}
                  className="absolute left-2 sm:left-4 p-2.5 sm:p-2 touch-target bg-bg-void/90 border border-border-subtle hover:border-gold-champagne active:border-gold-champagne text-cream-dim hover:text-gold-champagne rounded-full transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus-visible:ring-2 focus-visible:ring-gold-champagne drop-shadow-md z-10"
                  aria-label="Previous image"
               >
                  <ChevronLeft size={24} />
               </button>
               <button
                  onClick={goNext}
                  className="absolute right-2 sm:right-4 p-2.5 sm:p-2 touch-target bg-bg-void/90 border border-border-subtle hover:border-gold-champagne active:border-gold-champagne text-cream-dim hover:text-gold-champagne rounded-full transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus-visible:ring-2 focus-visible:ring-gold-champagne drop-shadow-md z-10"
                  aria-label="Next image"
               >
                  <ChevronRight size={24} />
               </button>

               {/* Counter badge — always visible on touch */}
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-bg-void/90 border border-border-subtle px-3 py-1.5 rounded-full font-mono text-[0.65rem] text-cream-dim tracking-[0.15em] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                 {String(currentIndex + 1).padStart(2, '0')} / {images.length}
               </div>
            </div>

            {/* Thumbnail Strip */}
            <div 
              ref={thumbnailContainerRef}
              className="w-full overflow-x-auto pb-4 pt-2 flex gap-3 snap-x scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar specifically for the strip
            >
               {images.map((filename, i) => (
                 <button
                   key={filename}
                   onClick={() => setCurrentIndex(i)}
                   className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 touch-target bg-[#111110] transition-all duration-300 snap-center rounded-[4px] overflow-hidden cursor-pointer ${
                     currentIndex === i 
                       ? 'border-2 border-gold-champagne scale-105 opacity-100 shadow-[0_0_15px_rgba(201,168,76,0.15)]' 
                       : 'border border-border-subtle opacity-40 hover:opacity-100 hover:border-gold-dim'
                   }`}
                   aria-label={`View image ${i + 1}`}
                 >
                   <ImageWithFallback src={`/alu-post-com-headlines/${filename}`} alt="" className="w-full h-full object-cover" loading="lazy" />
                 </button>
               ))}
               
               <style dangerouslySetInnerHTML={{__html: `
                 div::-webkit-scrollbar { display: none; }
               `}} />
            </div>

          </div>
        </div>
      </FadeIn>
    </section>
  );
};
