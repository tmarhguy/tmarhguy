import { MetadataRoute } from 'next';

import { getAllLogs } from '@/lib/logs';
import { SITE_URL } from '@/lib/utils';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const logs = getAllLogs();
  const logEntries: MetadataRoute.Sitemap = logs.map((entry) => ({
    url: `${SITE_URL}/writing/${entry.slug}/`,
    lastModified: new Date(entry.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/resume/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/writing/`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/stats/`,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact/`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...logEntries,
  ];
}
