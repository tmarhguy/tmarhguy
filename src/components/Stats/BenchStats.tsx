import projects from '@/data/projects';
import { countSourceLines } from '@/lib/loc';
import { getAllLogs } from '@/lib/logs';

import StatGrid from './StatGrid';
import type { StatItem } from './types';

export default function BenchStats() {
  const items: StatItem[] = [
    {
      label: 'Writing entries',
      value: getAllLogs().length.toLocaleString('en-US'),
      link: '/writing/',
    },
    {
      label: 'Projects listed',
      value: projects.length.toLocaleString('en-US'),
      link: '/projects/',
    },
    {
      label: 'TypeScript lines',
      value: countSourceLines().toLocaleString('en-US'),
      link: 'https://github.com/tmarhguy/tmarhguy/graphs/contributors',
    },
  ];

  return <StatGrid items={items} />;
}
