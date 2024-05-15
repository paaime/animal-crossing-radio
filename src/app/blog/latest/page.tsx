import PreviewCard from '@/components/blog/PreviewCard';
import { Metadata } from 'next';
import Link from 'next/link';
import { blogs } from '@/data/blogs';
import BlogList from '@/components/blog/BlogList';

export const metadata: Metadata = {
  metadataBase: new URL('https://animal-crossing-radio.com'),
  title: 'Animal Crossing Radio | Latest Blog Posts',
  description:
    'Explore the latest news, tips, and guides on Animal Crossing with Animal Crossing Radio. Stay updated on all things related to this popular game. Dive into our blog posts for expert insights and community discussions.',
};

export default function Blog() {
  return (
    <div>
      <div className="flex flex-col gap-2 lg:gap-5 py-10 border-b border-gray-700">
        <h1 className="text-3xl lg:text-6xl font-semibold">Latest</h1>
        <p className="text-lg text-gray-400 font-light">
          Discover the latest news and updates from the Animal Crossing world.
        </p>
      </div>
      <BlogList />
      <Link
        href={'/blog'}
        className="flex justify-end text-green-500 hover:text-opacity-80 transition-all pb-20"
      >
        All Posts →
      </Link>
    </div>
  );
}
