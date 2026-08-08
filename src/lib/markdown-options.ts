import type { MarkdownToJSX } from 'markdown-to-jsx';

import MarkdownLink from '@/components/Markdown/MarkdownLink';

export function withMarkdownLinks(
  overrides: MarkdownToJSX.Options['overrides'] = {},
): MarkdownToJSX.Options['overrides'] {
  return {
    a: { component: MarkdownLink },
    ...overrides,
  };
}
