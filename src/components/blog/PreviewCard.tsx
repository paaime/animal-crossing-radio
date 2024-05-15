import { IBlog } from '@/types/Blog';
import Link from 'next/link';

export default function PreviewCard({ blog }: { blog: IBlog }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="flex flex-col xl:flex-row py-12 cursor-pointer"
    >
      <p className="text-gray-400 mb-3 xl:w-[400px]">{blog.date}</p>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-1">
          {blog.title}
        </h2>
        <div className="flex gap-3 text-green-500 uppercase text-sm tracking-tight">
          {blog.tags.map((tag, key) => (
            <span key={key}>{tag}</span>
          ))}
        </div>
        <p className="text-gray-400 my-7 font-light">
          {blog.description.substring(0, 200)}...
        </p>
        <p className="text-green-500 hover:text-opacity-80 transition-all">
          Read more →
        </p>
      </div>
    </Link>
  );
}
