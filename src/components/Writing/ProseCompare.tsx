import type { ReactNode } from 'react';

function commandsFromChildren(children: ReactNode): string {
  if (typeof children === 'string') {
    return children.trim();
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === 'string' ? child : ''))
      .join('')
      .trim();
  }

  return '';
}

function isAccentProp(accent?: boolean | string): boolean {
  return accent === true || accent === '' || accent === 'true';
}

export function ProseCompare({ children }: { children?: ReactNode }) {
  return <div className="prose-compare">{children}</div>;
}

export function ProseCompareItem({
  label,
  tag,
  note,
  accent,
  children,
}: {
  label: string;
  tag?: string;
  note?: string;
  accent?: boolean | string;
  children?: ReactNode;
}) {
  const commands = commandsFromChildren(children);
  const itemClass = isAccentProp(accent)
    ? 'prose-compare__item prose-compare__item--accent'
    : 'prose-compare__item';

  return (
    <div className={itemClass}>
      <p className="prose-compare__label">
        {label}
        {tag ? <span className="prose-compare__tag">{tag}</span> : null}
      </p>
      {commands ? (
        <pre>
          <code>{commands}</code>
        </pre>
      ) : null}
      {note ? <p className="prose-compare__note">{note}</p> : null}
    </div>
  );
}
