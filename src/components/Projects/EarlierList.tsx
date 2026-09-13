'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { Project } from '@/data/projects';
import { getProjectSlug } from '@/data/projects';
import { externalAnchorProps } from '@/lib/external-link';
import Lightbox, { type LightboxItem } from '../Media/Lightbox';

/**
 * Quiet ledger for demoted breadth — one small cover thumbnail per row so it
 * reads as an archive shelf, not exhibition cards and not bare lines.
 * Thumbnails open in the shared viewer: Escape always exits.
 */
export default function EarlierList({ projects }: { projects: Project[] }) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  if (projects.length === 0) {
    return null;
  }

  const gallery: LightboxItem[] = projects.flatMap((project) =>
    project.image
      ? [
          {
            kind: 'image' as const,
            src: project.image,
            alt: project.imageCaption ?? `${project.title} project screenshot`,
            caption: {
              text: project.title,
              href: project.site ?? project.link,
              detail: project.imageCaption,
            },
          },
        ]
      : [],
  );
  const galleryIndexBySrc = new Map(
    gallery.map((item, galleryIndex) => [item.src, galleryIndex]),
  );

  return (
    <>
      <ul className="earlier-list">
        {projects.map((project) => {
          const href = project.site ?? project.link;
          return (
            <li
              key={project.title}
              id={getProjectSlug(project)}
              className="earlier-item earlier-item--media"
            >
              {project.image && (
                <button
                  type="button"
                  className="open-source-thumb earlier-thumb"
                  onClick={() =>
                    setViewerIndex(
                      galleryIndexBySrc.get(project.image!) ?? null,
                    )
                  }
                  aria-label={`Open screenshot: ${project.imageCaption ?? project.title}`}
                >
                  <Image
                    src={project.image}
                    alt=""
                    width={1200}
                    height={750}
                    sizes="(max-width: 735px) 144px, 192px"
                  />
                </button>
              )}
              <span className="earlier-item-body">
                <span className="earlier-head">
                  {href ? (
                    <a href={href} {...externalAnchorProps(href)}>
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                  <time dateTime={project.date}>{project.period}</time>
                </span>
                <span className="earlier-desc">{project.desc}</span>
              </span>
            </li>
          );
        })}
      </ul>
      {viewerIndex !== null && gallery[viewerIndex] && (
        <Lightbox
          items={gallery}
          index={viewerIndex}
          onClose={() => setViewerIndex(null)}
          onIndexChange={setViewerIndex}
        />
      )}
    </>
  );
}
