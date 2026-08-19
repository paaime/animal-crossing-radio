import { Metadata } from 'next';
import BlogList from '@/components/blog/BlogList';
import Pagination from '@/components/blog/Pagination';
import { pageMetadata } from '@/config/metadata';
import { getSortedPosts, paginate, parsePageParam } from '@/utils/blog';

const POSTS_PER_PAGE = 5;

const description =
  'Explore all our news, tips, and guides on Animal Crossing with Animal Crossing Radio. Stay updated on all things related to this popular game. Dive into our blog posts for expert insights and community discussions.';

interface IBlogPageProps {
  searchParams: { page?: string | string[] };
}

export function generateMetadata({ searchParams }: IBlogPageProps): Metadata {
  const { page, totalPages } = paginate(
    getSortedPosts(),
    parsePageParam(searchParams.page),
    POSTS_PER_PAGE
  );

  return pageMetadata({
    title: page > 1 ? `Blog Posts — Page ${page} of ${totalPages}` : 'Blog Posts',
    description,
    path: page > 1 ? `/blog?page=${page}` : '/blog',
  });
}

export default function Blog({ searchParams }: IBlogPageProps) {
  const { items, page, totalPages } = paginate(
    getSortedPosts(),
    parsePageParam(searchParams.page),
    POSTS_PER_PAGE
  );

  return (
    <div className="pt-4">
      <h1 className="font-seurat text-3xl leading-tight text-[#775B46] md:text-5xl">
        All blog posts
      </h1>
      <p className="mt-3 text-[#6b6052]">
        News, updates and guides from the Animal Crossing world.
      </p>

      <BlogList posts={items} />
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
