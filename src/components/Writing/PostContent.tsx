import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { ProseAddrPipe } from './ProseAddrPipe';
import { ProseBitfield, ProseBitseg } from './ProseBitfield';
import { ProseCompare, ProseCompareItem } from './ProseCompare';
import { ProseFlow, ProseFlowStep } from './ProseFlow';
import { ProseMirrors } from './ProseMirrors';
import { ProseNote } from './ProseNote';

interface PostContentProps {
  content: string;
  /**
   * Intrinsic dimensions per image src, measured at build time by the page.
   * Every image previously declared 1200x630 regardless of its real shape, so
   * each one reserved the wrong ratio and shifted the page as it loaded.
   */
  imageSizes?: Record<string, { width: number; height: number }>;
}

/** Remote/data images cannot be inspected from the repository at build time. */
const FALLBACK_SIZE = { width: 1200, height: 675 };

function isRootLocalImage(src: string): boolean {
  return src.startsWith('/') && !src.startsWith('//');
}

function ProseTable({
  children,
  ...props
}: ComponentPropsWithoutRef<'table'> & { children?: ReactNode }) {
  return (
    <div className="prose-table-wrap">
      <table {...props}>{children}</table>
    </div>
  );
}

function ProseVideo(props: ComponentPropsWithoutRef<'video'>) {
  return (
    <video {...props} muted playsInline preload={props.preload ?? 'metadata'} />
  );
}

export default function PostContent({
  content,
  imageSizes = {},
}: PostContentProps) {
  return (
    <Markdown
      options={{
        overrides: {
          ProseCompare: {
            component: ProseCompare,
          },
          ProseCompareItem: {
            component: ProseCompareItem,
          },
          ProseNote: {
            component: ProseNote,
          },
          ProseFlow: {
            component: ProseFlow,
          },
          ProseFlowStep: {
            component: ProseFlowStep,
          },
          ProseBitfield: {
            component: ProseBitfield,
          },
          ProseBitseg: {
            component: ProseBitseg,
          },
          ProseMirrors: {
            component: ProseMirrors,
          },
          ProseAddrPipe: {
            component: ProseAddrPipe,
          },
          table: {
            component: ProseTable,
          },
          video: {
            component: ProseVideo,
          },
          img: {
            component: ({ alt, src }: { alt?: string; src?: string }) => {
              if (!src) {
                return null;
              }

              const measuredSize = imageSizes[src];
              if (isRootLocalImage(src) && !measuredSize) {
                throw new Error(
                  `Missing measured dimensions for local article image: ${src}`,
                );
              }
              const { width, height } = measuredSize ?? FALLBACK_SIZE;

              return (
                <Image
                  src={src}
                  alt={alt || ''}
                  width={width}
                  height={height}
                  loading="lazy"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '70%',
                    maxHeight: '28rem',
                  }}
                />
              );
            },
          },
        },
      }}
    >
      {content}
    </Markdown>
  );
}
