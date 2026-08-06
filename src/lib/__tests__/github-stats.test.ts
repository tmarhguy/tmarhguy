import { describe, expect, it, vi } from 'vitest';

import { fetchGitHubStats, formatGitHubActivityDate } from '../github-stats';

describe('formatGitHubActivityDate', () => {
  it('includes time when the timestamp is not midnight UTC', () => {
    expect(formatGitHubActivityDate('2026-07-20T18:30:00Z')).toBe(
      'Jul 20, 2026, 6:30 PM UTC',
    );
  });

  it('shows date only for midnight UTC timestamps', () => {
    expect(formatGitHubActivityDate('2026-01-10T00:00:00Z')).toBe(
      'Jan 10, 2026',
    );
  });
});

describe('fetchGitHubStats', () => {
  it('returns live readings when the REST API succeeds', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('/graphql')) {
          return Promise.resolve({ ok: false, status: 401 });
        }

        if (url.includes('/events/public')) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve([
                {
                  type: 'PushEvent',
                  created_at: '2026-08-04T17:21:27Z',
                  actor: { login: 'tmarhguy' },
                  repo: { name: 'tmarhguy/tmarhguy' },
                },
              ]),
          });
        }

        if (url.includes('/users/') && !url.includes('/repos')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ public_repos: 10, followers: 5 }),
          });
        }

        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { stargazers_count: 12, forks_count: 3 },
              { stargazers_count: 8, forks_count: 2 },
            ]),
        });
      }),
    );

    const stats = await fetchGitHubStats();

    expect(stats.source).toBe('github');
    expect(stats.profile.public_repos).toBe(10);
    expect(stats.profile.stars).toBe(20);
    expect(stats.profile.forks).toBe(5);
    expect(stats.profile.last_activity_at).toBe('2026-08-04T17:21:27Z');
    expect(stats.profile.last_push).toEqual({
      repo: 'tmarhguy',
      fullName: 'tmarhguy/tmarhguy',
      url: 'https://github.com/tmarhguy/tmarhguy',
      at: '2026-08-04T17:21:27Z',
    });
    expect(stats.profile.contributions_last_year).toBeNull();
    expect(stats.profile.contributions_since_2025).toBeNull();

    vi.unstubAllGlobals();
  });

  it('ignores bot pushes when resolving last activity', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('/graphql')) {
          return Promise.resolve({ ok: false, status: 401 });
        }

        if (url.includes('/events/public')) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve([
                {
                  type: 'PushEvent',
                  created_at: '2026-08-06T08:41:11Z',
                  actor: { login: 'dependabot[bot]' },
                },
                {
                  type: 'PushEvent',
                  created_at: '2026-08-04T17:21:27Z',
                  actor: { login: 'tmarhguy' },
                  repo: { name: 'tmarhguy/tmarhguy' },
                },
              ]),
          });
        }

        if (url.includes('/users/') && !url.includes('/repos')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ public_repos: 2, followers: 1 }),
          });
        }

        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([{ stargazers_count: 1, forks_count: 0 }]),
        });
      }),
    );

    const stats = await fetchGitHubStats();

    expect(stats.profile.last_activity_at).toBe('2026-08-04T17:21:27Z');

    vi.unstubAllGlobals();
  });

  it('includes contributions when GraphQL succeeds', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'test-token');
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('/graphql')) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                data: {
                  user: {
                    followers: { totalCount: 9 },
                    repositories: { totalCount: 4 },
                    contributionsCollection: {
                      contributionCalendar: {
                        totalContributions: 842,
                        weeks: [
                          {
                            contributionDays: [
                              {
                                date: '2026-02-01',
                                contributionCount: 0,
                              },
                              {
                                date: '2026-02-02',
                                contributionCount: 4,
                              },
                            ],
                          },
                        ],
                      },
                    },
                    contributionsSince2025: {
                      contributionCalendar: { totalContributions: 610 },
                    },
                    repos: {
                      nodes: [
                        {
                          stargazerCount: 15,
                          forkCount: 2,
                          pushedAt: '2026-02-01T00:00:00Z',
                          updatedAt: '2026-02-01T12:00:00Z',
                        },
                      ],
                      pageInfo: { hasNextPage: false, endCursor: null },
                    },
                  },
                },
              }),
          });
        }

        if (url.includes('/events/public')) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve([
                {
                  type: 'PushEvent',
                  created_at: '2026-02-03T10:15:00Z',
                  actor: { login: 'tmarhguy' },
                  repo: { name: 'tmarhguy/tools' },
                },
              ]),
          });
        }

        return Promise.resolve({ ok: false, status: 404 });
      }),
    );

    const stats = await fetchGitHubStats();

    expect(stats.profile.contributions_last_year).toBe(842);
    expect(stats.profile.contributions_since_2025).toBe(610);
    expect(stats.profile.stars).toBe(15);
    expect(stats.profile.last_activity_at).toBe('2026-02-03T10:15:00Z');
    expect(stats.profile.last_push?.fullName).toBe('tmarhguy/tools');

    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('falls back when the API fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false, status: 403 })),
    );

    const stats = await fetchGitHubStats();

    expect(stats.source).toBe('fallback');
    expect(stats.profile.public_repos).toBe(0);

    vi.unstubAllGlobals();
  });
});
