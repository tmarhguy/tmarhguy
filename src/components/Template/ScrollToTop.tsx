'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { scrollToHashWhenReady } from '@/lib/scroll-to-hash';

/**
 * Scrolls to top on route changes, unless the URL carries a hash target.
 * Next.js client navigation does not reliably restore fragment scroll
 * positions, and this component used to force scroll-to-top on every
 * pathname change — which wiped out /projects/#slug and /writing/#writing-*.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const { hash } = window.location;

    if (hash) {
      scrollToHashWhenReady(hash);
      isFirstRender.current = false;
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) {
        scrollToHashWhenReady();
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return null;
}
