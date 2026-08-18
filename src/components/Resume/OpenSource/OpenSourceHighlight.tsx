'use client';

import Markdown from 'markdown-to-jsx';
import type { ReactNode } from 'react';

function MarkdownPassthrough({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

interface OpenSourceHighlightProps {
  highlight: string;
}

export default function OpenSourceHighlight({
  highlight,
}: OpenSourceHighlightProps) {
  return (
    <Markdown
      options={{
        overrides: {
          a: {
            props: {
              className: 'hero-inline-link',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
          code: {
            component: MarkdownPassthrough,
          },
          pre: {
            component: MarkdownPassthrough,
          },
          p: {
            component: MarkdownPassthrough,
          },
        },
      }}
    >
      {highlight}
    </Markdown>
  );
}
