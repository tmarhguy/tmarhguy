import type { AnchorHTMLAttributes } from 'react';

import { externalAnchorProps } from '@/lib/external-link';

type MarkdownLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export default function MarkdownLink({
  href,
  children,
  ...props
}: MarkdownLinkProps) {
  return (
    <a href={href} {...externalAnchorProps(href)} {...props}>
      {children}
    </a>
  );
}
