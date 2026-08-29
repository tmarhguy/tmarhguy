import type { ReactNode } from 'react';

export function ProseNote({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <aside className="prose-note">
      {title ? <p className="prose-note__title">{title}</p> : null}
      <div className="prose-note__body">{children}</div>
    </aside>
  );
}
