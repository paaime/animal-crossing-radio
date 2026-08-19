import { IBlog } from '@/types/Blog';
import PostCard from './PostCard';

export default function BlogList({ posts }: { posts: IBlog[] }) {
  if (posts.length === 0) {
    return (
      <p className="mt-8 text-[#6b6052]">
        No posts yet — check back soon.
      </p>
    );
  }

  return (
    <ul className="mt-8 space-y-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard blog={post} />
        </li>
      ))}
    </ul>
  );
}
