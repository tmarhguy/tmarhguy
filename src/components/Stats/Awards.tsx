import StatGrid from '@/components/Stats/StatGrid';
import { AWARD_STATS } from '@/data/stats/personal';

export default function Awards() {
  return <StatGrid items={AWARD_STATS} />;
}
