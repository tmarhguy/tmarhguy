import type { StatItem } from './types';

interface StatGridProps {
  items: StatItem[];
}

export default function StatGrid({ items }: StatGridProps) {
  return (
    <dl className="stat-grid">
      {items.map((item) => (
        <div className="stat-card" key={item.label}>
          <dt className="stat-card-label">{item.label}</dt>
          <dd className="stat-card-value">
            {item.link ? (
              <a href={item.link} className="stat-card-link">
                {item.value}
              </a>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
