import { useEffect, useState } from 'react';

/**
 * Returns true when the viewport matches the media query.
 * Uses 1024px as the desktop breakpoint (matches Tailwind lg).
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth < 1024;
  });

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    const handler = () => setIsMobile(mql.matches);
    handler(); // set initial
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}
