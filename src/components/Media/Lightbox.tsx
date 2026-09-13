'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface LightboxCaption {
  text: string;
  href?: string;
  detail?: string;
}

export interface LightboxImageItem {
  kind: 'image';
  src: string;
  alt: string;
  /** Intrinsic dimensions for next/image — default to the 16/10 card box. */
  width?: number;
  height?: number;
  caption?: LightboxCaption;
}

export interface LightboxVideoItem {
  kind: 'video';
  src: string;
  label: string;
  poster?: string;
  caption?: LightboxCaption;
}

export type LightboxItem = LightboxImageItem | LightboxVideoItem;

interface LightboxProps {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

function itemLabel(item: LightboxItem): string {
  return item.kind === 'image' ? item.alt : item.label;
}

/**
 * Full-screen media viewer. Escape, the backdrop, and the close button all
 * exit; arrow keys step through multi-item galleries. Focus moves into the
 * viewer on open and returns to the trigger on close, with body scroll
 * locked while open.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const total = items.length;
  const item = items[index];

  useEffect(() => {
    setMounted(true);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      onIndexChange((next + total) % total);
    },
    [onIndexChange, total],
  );

  // Escape closes; arrows step through the gallery.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowRight' && total > 1) {
        event.preventDefault();
        goTo(index + 1);
      } else if (event.key === 'ArrowLeft' && total > 1) {
        event.preventDefault();
        goTo(index - 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goTo, index, onClose, total]);

  // Lock body scroll (iOS-safe) while open.
  useEffect(() => {
    const scrollY = window.scrollY;
    const { body } = document;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Move focus into the viewer on open, restore the trigger on close.
  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement;
    const previous = previousActiveElement.current;

    const focusable =
      viewerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusable?.length) {
      focusable[0].focus();
    }

    return () => {
      previous?.focus();
    };
  }, []);

  // Keep Tab cycling inside the viewer.
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const focusable =
      viewerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  if (!mounted || !item) return null;

  return createPortal(
    <div
      ref={viewerRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={itemLabel(item)}
      onKeyDown={handleKeyDown}
    >
      <div className="lightbox-backdrop" onClick={onClose} aria-hidden="true" />
      <figure className="lightbox-frame">
        {total > 1 && (
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={() => goTo(index - 1)}
            aria-label="Previous media"
          >
            <span aria-hidden="true">‹</span>
          </button>
        )}
        <div className="lightbox-media">
          {item.kind === 'image' ? (
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={item.width ?? 1200}
              height={item.height ?? 750}
              sizes="(max-width: 735px) 100vw, 90vw"
            />
          ) : (
            <video
              key={item.src}
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              muted
              loop
              playsInline
              aria-label={item.label}
            />
          )}
        </div>
        {total > 1 && (
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={() => goTo(index + 1)}
            aria-label="Next media"
          >
            <span aria-hidden="true">›</span>
          </button>
        )}
        <button
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close viewer"
        >
          <span aria-hidden="true">×</span>
        </button>
        <figcaption className="lightbox-caption">
          {item.caption ? (
            item.caption.href ? (
              <a href={item.caption.href}>{item.caption.text}</a>
            ) : (
              <span>{item.caption.text}</span>
            )
          ) : (
            <span>{itemLabel(item)}</span>
          )}
          {item.caption?.detail && <span>{item.caption.detail}</span>}
          {total > 1 && (
            <span className="lightbox-count">
              {index + 1} / {total}
            </span>
          )}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}
