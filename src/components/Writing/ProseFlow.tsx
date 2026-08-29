import type { ReactNode } from 'react';

function isAccentProp(accent?: boolean | string): boolean {
  return accent === true || accent === '' || accent === 'true';
}

export function ProseFlow({ children }: { children?: ReactNode }) {
  return <ol className="prose-flow">{children}</ol>;
}

export function ProseFlowStep({
  label,
  detail,
  accent,
}: {
  label: string;
  detail?: string;
  accent?: boolean | string;
}) {
  const stepClass = isAccentProp(accent)
    ? 'prose-flow__step prose-flow__step--accent'
    : 'prose-flow__step';

  return (
    <li className={stepClass}>
      <span className="prose-flow__label">{label}</span>
      {detail ? <span className="prose-flow__detail">{detail}</span> : null}
    </li>
  );
}
