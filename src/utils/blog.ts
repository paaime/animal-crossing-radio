import { blogs } from '@/data/blogs';
import { IBlog } from '@/types/Blog';

const DATE_PATTERN = /^(\d{2})-(\d{2})-(\d{4})$/;

/**
 * Post dates are authored as "MM-DD-YYYY" strings. `new Date('05-16-2024')`
 * relies on non-standard engine parsing, so build the date explicitly in UTC.
 */
export function parsePostDate(date: string): Date {
  const match = DATE_PATTERN.exec(date);

  if (!match) {
    throw new Error(
      `Invalid blog post date "${date}" — expected the MM-DD-YYYY format.`
    );
  }

  const [, month, day, year] = match;

  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
}

/** "05-16-2024" → "2024-05-16", for <time dateTime> and OG publishedTime. */
export function toIsoDate(date: string): string {
  return parsePostDate(date).toISOString().slice(0, 10);
}

/** "05-16-2024" → "May 16, 2024". UTC keeps the day stable west of Greenwich. */
export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsePostDate(date));
}

/** Every post, newest first. Never mutates the source array. */
export function getSortedPosts(): IBlog[] {
  return [...blogs].sort(
    (a, b) => parsePostDate(b.date).getTime() - parsePostDate(a.date).getTime()
  );
}

export interface IPaginated<T> {
  items: T[];
  page: number;
  totalPages: number;
}

/**
 * Slices a page out of `posts`. `page` comes from the query string, so it is
 * clamped to a real page — junk and out-of-range values fall back rather than
 * rendering an empty list.
 */
export function paginate<T>(
  posts: T[],
  page: number,
  perPage: number
): IPaginated<T> {
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const safePage = Number.isFinite(page)
    ? Math.min(Math.max(Math.trunc(page), 1), totalPages)
    : 1;
  const start = (safePage - 1) * perPage;

  return {
    items: posts.slice(start, start + perPage),
    page: safePage,
    totalPages,
  };
}

/** Reads a `?page=` value that may be absent, repeated, or not a number. */
export function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);

  return Number.isFinite(parsed) ? parsed : 1;
}
