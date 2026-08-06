import {
  fetchGitHubStats,
  formatGitHubActivityDate,
  GITHUB_PROFILE_URL,
} from '@/lib/github-stats';

import StatGrid from './StatGrid';
import type { StatItem } from './types';

function formatCount(value: number): string {
  return value.toLocaleString('en-US');
}

export default async function GitHubStats() {
  const { profile } = await fetchGitHubStats();

  const items: StatItem[] = [
    ...(profile.contributions_last_year !== null
      ? [
          {
            label: 'Contributions (12 mo)',
            value: formatCount(profile.contributions_last_year),
            link: GITHUB_PROFILE_URL,
          } satisfies StatItem,
        ]
      : []),
    ...(profile.contributions_since_2025 !== null
      ? [
          {
            label: 'Contributions since 2025',
            value: formatCount(profile.contributions_since_2025),
            link: GITHUB_PROFILE_URL,
          } satisfies StatItem,
        ]
      : []),
    {
      label: 'Stars (all repos)',
      value: formatCount(profile.stars),
      link: `${GITHUB_PROFILE_URL}?tab=stars`,
    },
    {
      label: 'Public repos',
      value: formatCount(profile.public_repos),
      link: `${GITHUB_PROFILE_URL}?tab=repositories`,
    },
    {
      label: 'Followers',
      value: formatCount(profile.followers),
      link: GITHUB_PROFILE_URL,
    },
    ...(profile.last_activity_at
      ? [
          {
            label: 'Last activity',
            value: formatGitHubActivityDate(profile.last_activity_at),
            link: GITHUB_PROFILE_URL,
          } satisfies StatItem,
        ]
      : []),
    {
      label: 'Forks (all repos)',
      value: formatCount(profile.forks),
      link: `${GITHUB_PROFILE_URL}?tab=repositories`,
    },
    ...(profile.last_push
      ? [
          {
            label: 'Last push (public)',
            value: profile.last_push.fullName,
            link: profile.last_push.url,
          } satisfies StatItem,
        ]
      : []),
  ];

  return <StatGrid items={items} />;
}
