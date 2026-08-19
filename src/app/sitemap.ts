import { MetadataRoute } from 'next';
import { blogs } from '@/data/blogs';
import { hourlyGames } from '@/data/hourlyGames';
import { absoluteUrl } from '@/config/site';
import { parsePostDate } from '@/utils/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: absoluteUrl(`/blog/${blog.slug}`),
    lastModified: parsePostDate(blog.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const hourlyEntries: MetadataRoute.Sitemap = hourlyGames.map((game) => ({
    url: absoluteUrl(`/hourly/${game.slug}`),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/hourly'), changeFrequency: 'monthly', priority: 0.9 },
    ...hourlyEntries,
    { url: absoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.7 },
    ...postEntries,
  ];
}
