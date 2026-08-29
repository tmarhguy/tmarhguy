import type { ReactNode } from 'react';

function isAccentProp(accent?: boolean | string): boolean {
  return accent === true || accent === '' || accent === 'true';
}

export function ProseBitfield({
  caption,
  children,
}: {
  caption?: string;
  children?: ReactNode;
}) {
  return (
    <figure className="prose-bitfield">
      <div className="prose-bitfield__row" role="group" aria-label={caption}>
        {children}
      </div>
      {caption ? (
        <figcaption className="prose-bitfield__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function ProseBitseg({
  bits,
  label,
  accent,
}: {
  bits: string;
  label: string;
  accent?: boolean | string;
}) {
  const segClass = isAccentProp(accent)
    ? 'prose-bitfield__seg prose-bitfield__seg--accent'
    : 'prose-bitfield__seg';

  return (
    <div className={segClass} style={{ flex: `1 1 ${Number(bits) || 1}0%` }}>
      <span className="prose-bitfield__bits">{bits}</span>
      <span className="prose-bitfield__name">{label}</span>
    </div>
  );
}
