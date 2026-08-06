import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockProfile = {
  public_repos: 24,
  followers: 18,
  contributions_last_year: 842,
  contributions_since_2025: 610,
  stars: 156,
  forks: 31,
  last_activity_at: '2026-07-20T18:30:00Z',
  last_push: {
    repo: 'tmarhguy',
    fullName: 'tmarhguy/tmarhguy',
    url: 'https://github.com/tmarhguy/tmarhguy',
    at: '2026-07-20T18:30:00Z',
  },
};

vi.stubGlobal(
  'fetch',
  vi.fn((url: string) => {
    if (url.includes('/events/public')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              type: 'PushEvent',
              created_at: mockProfile.last_activity_at,
              actor: { login: 'tmarhguy' },
              repo: { name: mockProfile.last_push.fullName },
            },
          ]),
      });
    }

    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            user: {
              followers: { totalCount: mockProfile.followers },
              repositories: { totalCount: mockProfile.public_repos },
              contributionsCollection: {
                contributionCalendar: {
                  totalContributions: mockProfile.contributions_last_year,
                  weeks: [],
                },
              },
              contributionsSince2025: {
                contributionCalendar: {
                  totalContributions: mockProfile.contributions_since_2025,
                },
              },
              repos: {
                nodes: [
                  {
                    stargazerCount: mockProfile.stars,
                    forkCount: mockProfile.forks,
                    pushedAt: mockProfile.last_activity_at,
                    updatedAt: mockProfile.last_activity_at,
                  },
                ],
                pageInfo: { hasNextPage: false, endCursor: null },
              },
            },
          },
        }),
    });
  }),
);

import GitHubStats from '../../Stats/GitHubStats';

describe('GitHubStats', () => {
  beforeEach(() => {
    vi.stubEnv('GITHUB_TOKEN', 'test-token');
    vi.mocked(global.fetch).mockClear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders profile-wide GitHub metrics', async () => {
    const Component = await GitHubStats();
    render(Component);

    expect(screen.getByText('Contributions (12 mo)')).toBeInTheDocument();
    expect(screen.getByText('842')).toBeInTheDocument();
    expect(screen.getByText('Contributions since 2025')).toBeInTheDocument();
    expect(screen.getByText('610')).toBeInTheDocument();
    expect(screen.getByText('Stars (all repos)')).toBeInTheDocument();
    expect(screen.getByText('156')).toBeInTheDocument();
    expect(screen.getByText('Forks (all repos)')).toBeInTheDocument();
    expect(screen.getByText('Last activity')).toBeInTheDocument();
    expect(screen.getByText('Jul 20, 2026, 6:30 PM UTC')).toBeInTheDocument();
    expect(screen.getByText('Last push (public)')).toBeInTheDocument();
    expect(screen.getByText('tmarhguy/tmarhguy')).toBeInTheDocument();
  });
});
