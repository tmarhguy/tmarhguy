'use client';

import { useState } from 'react';
import fallbacks from '@/data/press-fallbacks.json';
import previews from '@/data/press-previews.json';

export default function SourcePreview({
  url,
  publisher,
  imageOverride,
  video,
  eager = false,
}: {
  url: string;
  publisher: string;
  imageOverride?: string;
  video?: string;
  eager?: boolean;
}) {
  const [attempt, setAttempt] = useState(0);
  const image =
    imageOverride ??
    (previews as Record<string, { image: string | null }>)[url]?.image;
  const index =
    Array.from(url).reduce(
      (hash, letter) => (hash * 31 + letter.charCodeAt(0)) >>> 0,
      0,
    ) % fallbacks.length;
  const fallback = fallbacks[index].image;
  const src =
    attempt === 0
      ? (image ?? fallback)
      : attempt === 1
        ? fallback
        : '/images/me.jpg';
  return (
    <span
      className="press-preview"
      aria-hidden="true"
      title={
        image && attempt === 0
          ? undefined
          : `Illustrative image for ${publisher}`
      }
    >
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={imageOverride}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <>
          {/* Remote publisher images use native loading in the static export. */}
          {/* biome-ignore lint/performance/noImgElement: next/image cannot optimize remote previews in this static export. */}
          <img
            key={src}
            src={src}
            alt=""
            width={96}
            height={64}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setAttempt((current) => Math.min(current + 1, 2))}
          />
        </>
      )}
    </span>
  );
}
