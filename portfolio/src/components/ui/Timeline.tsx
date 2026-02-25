import { useEffect, useRef, type ReactNode } from 'react';

interface TimelineItemProps {
  year: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  isLast?: boolean;
  isMajor?: boolean;
}

export const TimelineItem = ({ year, title, subtitle, children, isLast = false, isMajor = false }: TimelineItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateX(0)';
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative pl-10 pb-10"
      style={{ opacity: 0, transform: 'translateX(-20px)', transition: 'all 0.5s ease' }}
    >
      {/* Vertical line */}
      {!isLast && (
        <div
          className="absolute left-0 top-3 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, #8a6e2f 15%, #8a6e2f 85%, transparent)' }}
        />
      )}
      
      {/* Glowing dot */}
      <div
        className="absolute top-1.5"
        style={{
          left: isMajor ? '-6px' : '-4px',
          width: isMajor ? '13px' : '9px',
          height: isMajor ? '13px' : '9px',
          borderRadius: '50%',
          background: '#c9a84c',
          boxShadow: isMajor
            ? '0 0 20px rgba(201,168,76,0.6)'
            : '0 0 12px rgba(201,168,76,0.4)',
        }}
      />

      {/* Content */}
      <div className="grid grid-cols-[90px_1fr] gap-6 items-start md:pl-4">
        <div className="font-mono text-[0.75rem] text-gold-dim tracking-wider pt-0.5">
          {year}
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary mb-1">{title}</h2>
          {subtitle && (
            <span className="inline-block font-mono text-[0.58rem] tracking-wider uppercase px-2 py-0.5 border border-gold-dim text-gold-champagne mt-1 mb-2">
              {subtitle}
            </span>
          )}
          <div className="text-[0.88rem] text-cream-dim leading-relaxed mt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
