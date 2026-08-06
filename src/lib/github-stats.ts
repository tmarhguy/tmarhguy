const GITHUB_USER = 'tmarhguy';
const CONTRIBUTIONS_SINCE_2025_FROM = '2025-01-01T00:00:00Z';

/** Static export bakes stats at build time — avoid no-store, which bails out of SSG. */
const STATIC_BUILD_FETCH: RequestInit = { next: { revalidate: false } };

export interface GitHubLastPush {
  /** Public repo slug, e.g. tools */
  repo: string;
  /** Full name, e.g. tmarhguy/tools */
  fullName: string;
  url: string;
  at: string;
}

export interface GitHubProfileStats {
  public_repos: number;
  followers: number;
  contributions_last_year: number | null;
  contributions_since_2025: number | null;
  stars: number;
  forks: number;
  last_activity_at: string | null;
  last_push: GitHubLastPush | null;
}

export interface GitHubStatsBundle {
  profile: GitHubProfileStats;
  source: 'github' | 'fallback';
}

const PROFILE_FALLBACK: GitHubProfileStats = {
  public_repos: 0,
  followers: 0,
  contributions_last_year: null,
  contributions_since_2025: null,
  stars: 0,
  forks: 0,
  last_activity_at: null,
  last_push: null,
};

const PROFILE_QUERY = `query GitHubProfileStats($login: String!, $after: String, $from2025: DateTime!) {
  user(login: $login) {
    followers { totalCount }
    repositories(ownerAffiliations: OWNER) { totalCount }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
    contributionsSince2025: contributionsCollection(from: $from2025) {
      contributionCalendar { totalContributions }
    }
    repos: repositories(
      first: 100
      after: $after
      ownerAffiliations: OWNER
      orderBy: { field: PUSHED_AT, direction: DESC }
    ) {
      nodes { stargazerCount forkCount pushedAt updatedAt }
      pageInfo { hasNextPage endCursor }
    }
  }
}`;

interface RestUser {
  public_repos: number;
  followers: number;
}

interface RestRepo {
  stargazers_count: number;
  forks_count: number;
}

interface GitHubPublicEvent {
  type: string;
  created_at: string;
  actor?: { login?: string; display_login?: string };
  repo?: { name?: string };
}

interface HumanActivitySnapshot {
  last_activity_at: string | null;
  last_push: GitHubLastPush | null;
}

interface GraphQLContributionDay {
  date: string;
  contributionCount: number;
}

interface GraphQLUser {
  followers: { totalCount: number };
  repositories: { totalCount: number };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: { contributionDays: GraphQLContributionDay[] }[];
    };
  };
  contributionsSince2025: {
    contributionCalendar: { totalContributions: number };
  };
  repos: {
    nodes: {
      stargazerCount: number;
      forkCount: number;
      pushedAt: string;
      updatedAt: string;
    }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
}

function laterActivity(
  current: string | null,
  candidate: string | null | undefined,
): string | null {
  if (!candidate) {
    return current;
  }

  if (!current) {
    return candidate;
  }

  return new Date(candidate) > new Date(current) ? candidate : current;
}

function latestContributionDay(
  weeks: { contributionDays: GraphQLContributionDay[] }[] | undefined,
): string | null {
  if (!weeks) {
    return null;
  }

  let latest: string | null = null;

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > 0 && (!latest || day.date > latest)) {
        latest = day.date;
      }
    }
  }

  // Calendar days have no time — use end of day UTC for ordering against pushes.
  return latest ? `${latest}T23:59:59.000Z` : null;
}

export function formatGitHubActivityDate(iso: string): string {
  const date = new Date(iso);
  const isMidnightUtc =
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0;

  if (iso.includes('T') && !isMidnightUtc) {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short',
    });
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github.v3+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, {
    ...STATIC_BUILD_FETCH,
    headers: authHeaders(),
  });

  if (!response.ok) {
    console.warn(`GitHub API returned ${response.status} for ${url}`);
    return null;
  }

  return response.json() as Promise<T>;
}

function eventActorLogin(event: GitHubPublicEvent): string {
  return (event.actor?.login ?? event.actor?.display_login ?? '').toLowerCase();
}

function parsePublicPush(event: GitHubPublicEvent): GitHubLastPush | null {
  const fullName = event.repo?.name;
  if (!fullName) {
    return null;
  }

  const repo = fullName.includes('/')
    ? fullName.split('/').slice(1).join('/')
    : fullName;

  return {
    repo,
    fullName,
    url: `https://github.com/${fullName}`,
    at: event.created_at,
  };
}

async function fetchHumanActivitySnapshot(): Promise<HumanActivitySnapshot> {
  const humanActivityTypes = new Set([
    'PushEvent',
    'CreateEvent',
    'DeleteEvent',
    'PullRequestEvent',
    'IssuesEvent',
    'IssueCommentEvent',
    'PullRequestReviewEvent',
    'WatchEvent',
    'ForkEvent',
    'PublicEvent',
  ]);

  let last_activity_at: string | null = null;
  let last_push: GitHubLastPush | null = null;

  for (let page = 1; page <= 3; page += 1) {
    const events = await fetchJson<GitHubPublicEvent[]>(
      `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100&page=${page}`,
    );

    if (!events?.length) {
      break;
    }

    for (const event of events) {
      if (eventActorLogin(event) !== GITHUB_USER) {
        continue;
      }

      if (!last_activity_at && humanActivityTypes.has(event.type)) {
        last_activity_at = event.created_at;
      }

      if (!last_push && event.type === 'PushEvent') {
        last_push = parsePublicPush(event);
      }

      if (last_activity_at && last_push) {
        return { last_activity_at, last_push };
      }
    }

    if (events.length < 100) {
      break;
    }
  }

  return { last_activity_at, last_push };
}

async function fetchRepoTotalsRest(): Promise<{
  stars: number;
  forks: number;
} | null> {
  let stars = 0;
  let forks = 0;

  for (let page = 1; page <= 5; page += 1) {
    const repos = await fetchJson<RestRepo[]>(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&type=owner&sort=pushed&direction=desc`,
    );

    if (!repos?.length) {
      break;
    }

    for (const repo of repos) {
      stars += repo.stargazers_count;
      forks += repo.forks_count;
    }

    if (repos.length < 100) {
      break;
    }
  }

  return { stars, forks };
}

async function fetchProfileGraphQL(): Promise<GitHubProfileStats | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  let stars = 0;
  let forks = 0;
  let cursor: string | null = null;
  let hasNextPage = true;
  let profile: GitHubProfileStats | null = null;
  let contributionWeeks:
    | { contributionDays: GraphQLContributionDay[] }[]
    | undefined;

  while (hasNextPage) {
    const response = await fetch('https://api.github.com/graphql', {
      ...STATIC_BUILD_FETCH,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: PROFILE_QUERY,
        variables: {
          login: GITHUB_USER,
          after: cursor,
          from2025: CONTRIBUTIONS_SINCE_2025_FROM,
        },
      }),
    });

    if (!response.ok) {
      console.warn(`GitHub GraphQL returned ${response.status}`);
      return null;
    }

    const payload = (await response.json()) as {
      data?: { user: GraphQLUser | null };
      errors?: { message: string }[];
    };

    if (payload.errors?.length || !payload.data?.user) {
      console.warn('GitHub GraphQL error:', payload.errors?.[0]?.message);
      return null;
    }

    const user = payload.data.user;

    if (!profile) {
      contributionWeeks =
        user.contributionsCollection.contributionCalendar.weeks;
      profile = {
        public_repos: user.repositories.totalCount,
        followers: user.followers.totalCount,
        contributions_last_year:
          user.contributionsCollection.contributionCalendar.totalContributions,
        contributions_since_2025:
          user.contributionsSince2025.contributionCalendar.totalContributions,
        stars: 0,
        forks: 0,
        last_activity_at: null,
        last_push: null,
      };
    }

    for (const repo of user.repos.nodes) {
      stars += repo.stargazerCount;
      forks += repo.forkCount;
    }

    hasNextPage = user.repos.pageInfo.hasNextPage;
    cursor = user.repos.pageInfo.endCursor;
  }

  if (!profile) {
    return null;
  }

  return {
    ...profile,
    stars,
    forks,
    last_activity_at: latestContributionDay(contributionWeeks),
  };
}

async function fetchProfileRest(): Promise<GitHubProfileStats | null> {
  const [userData, repoTotals] = await Promise.all([
    fetchJson<RestUser>(`https://api.github.com/users/${GITHUB_USER}`),
    fetchRepoTotalsRest(),
  ]);

  if (!userData || !repoTotals) {
    return null;
  }

  return {
    public_repos: userData.public_repos,
    followers: userData.followers,
    contributions_last_year: null,
    contributions_since_2025: null,
    stars: repoTotals.stars,
    forks: repoTotals.forks,
    last_activity_at: null,
    last_push: null,
  };
}

/**
 * Profile-wide GitHub metrics for the stats page.
 * GraphQL (contributions + repo totals) when GITHUB_TOKEN is set; REST otherwise.
 */
export async function fetchGitHubStats(): Promise<GitHubStatsBundle> {
  try {
    const profile = (await fetchProfileGraphQL()) ?? (await fetchProfileRest());

    if (!profile) {
      return { profile: PROFILE_FALLBACK, source: 'fallback' };
    }

    const humanActivity = await fetchHumanActivitySnapshot();
    const last_activity_at = laterActivity(
      profile.last_activity_at,
      humanActivity.last_activity_at,
    );

    return {
      profile: {
        ...profile,
        last_activity_at,
        last_push: humanActivity.last_push,
      },
      source: 'github',
    };
  } catch (error) {
    console.warn('Failed to fetch GitHub stats, using fallback:', error);
    return { profile: PROFILE_FALLBACK, source: 'fallback' };
  }
}

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USER}`;
