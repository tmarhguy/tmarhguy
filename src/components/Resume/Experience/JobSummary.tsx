'use client';

import Markdown from 'markdown-to-jsx';
import type { ReactNode } from 'react';

import { withMarkdownLinks } from '@/lib/markdown-options';

function MarkdownPassthrough({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

interface JobSummaryProps {
  summary: string;
}

export default function JobSummary({ summary }: JobSummaryProps) {
  return (
    <Markdown
      options={{
        overrides: withMarkdownLinks({
          p: {
            props: {
              className: 'summary',
            },
          },
          code: {
            component: MarkdownPassthrough,
          },
          pre: {
            component: MarkdownPassthrough,
          },
        }),
      }}
    >
      {summary}
    </Markdown>
  );
}
