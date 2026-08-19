import Link from 'next/link';
import Image from 'next/image';
import { IBlog } from '@/types/Blog';
import { formatPostDate, toIsoDate } from '@/utils/blog';
import TagList from './TagList';

const EXCERPT_LENGTH = 160;

function excerpt(description: string): string {
  if (description.length <= EXCERPT_LENGTH) return description;

  const truncated = description.slice(0, EXCERPT_LENGTH);
  const lastSpace = truncated.lastIndexOf(' ');

  return `${(lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated).trimEnd()}…`;
}

export default function PostCard({ blog }: { blog: IBlog }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="custom-pointer group block rounded-xl bg-white/70 p-4 transition hover:bg-white sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <Image
          src={blog.cover}
          alt=""
          width={176}
          height={176}
          className="h-40 w-full rounded-lg object-cover sm:h-[88px] sm:w-[88px] sm:shrink-0"
        />
        <div className="min-w-0 flex-1">
          <time
            dateTime={toIsoDate(blog.date)}
            className="text-sm text-[#7a6f61]"
          >
            {formatPostDate(blog.date)}
          </time>
          <h2 className="mt-1 font-seurat text-lg text-[#775B46] group-hover:underline md:text-xl">
            {blog.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#5b5145]">
            {excerpt(blog.description)}
          </p>
          <TagList tags={blog.tags} className="mt-3" />
        </div>
      </div>
    </Link>
  );
}
