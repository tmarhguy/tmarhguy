import StatGrid from '@/components/Stats/StatGrid';
import type { StatItem } from '@/components/Stats/types';
import degrees from '@/data/resume/degrees';
import { PREVIOUS_SCHOOL } from '@/data/stats/personal';
import { CURRENT_CITY, FROM_COUNTRY } from '@/lib/telemetry';

export default function PersonalStats() {
  const education = degrees[0];

  const items: StatItem[] = [
    {
      label: 'From',
      value: FROM_COUNTRY,
    },
    {
      label: 'Based in',
      value: CURRENT_CITY,
    },
    {
      label: 'School',
      value: education.school,
      link: education.link,
    },
    {
      label: 'Previous school',
      value: PREVIOUS_SCHOOL.name,
      link: PREVIOUS_SCHOOL.link,
    },
    {
      label: 'Degree',
      value: education.degree,
    },
    {
      label: 'Class of',
      value: String(education.year),
    },
  ];

  return <StatGrid items={items} />;
}
