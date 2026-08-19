import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogs } from '@/data/blogs';
import { IBlog } from '@/types/Blog';
import { pageMetadata } from '@/config/metadata';
import { formatPostDate, parsePostDate, toIsoDate } from '@/utils/blog';
import PostBody from '@/components/blog/PostBody';
import TagList from '@/components/blog/TagList';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = blogs.find((entry) => entry.slug === params.slug);

  if (!blog) return { title: 'Blog not found' };

  return pageMetadata({
    title: blog.title,
    description: blog.meta,
    path: `/blog/${blog.slug}`,
    openGraph: {
      type: 'article',
      publishedTime: parsePostDate(blog.date).toISOString(),
      tags: blog.tags,
      images: [{ url: blog.cover, alt: blog.title }],
    },
  });
}

export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const blog: IBlog | undefined = blogs.find(
    (entry) => entry.slug === params.slug
  );

  if (!blog) notFound();

  return (
    <article className="pt-4">
      <Link
        href="/blog"
        className="custom-pointer text-sm text-[#7a6f61] hover:underline"
      >
        ← All blog posts
      </Link>

      <header className="mt-6">
        <time dateTime={toIsoDate(blog.date)} className="text-sm text-[#7a6f61]">
          {formatPostDate(blog.date)}
        </time>
        <h1 className="mt-1.5 font-seurat text-2xl leading-tight text-[#775B46] md:text-4xl">
          {blog.title}
        </h1>
        <p className="mt-3 leading-relaxed text-[#6b6052] md:text-lg">
          {blog.description}
        </p>
        <TagList tags={blog.tags} className="mt-4" />
      </header>

      <div className="mt-6 aspect-[3/2] overflow-hidden rounded-2xl">
        <Image
          className="h-full w-full object-cover"
          src={blog.cover}
          alt=""
          width={1920}
          height={1280}
          priority
        />
      </div>

      <PostBody blocks={blog.content} />

      <aside className="mt-12 rounded-2xl bg-white/70 p-6">
        <h2 className="font-seurat text-xl text-[#775B46]">
          Listen while you read
        </h2>
        <p className="mt-2 leading-relaxed">
          Animal Crossing Radio plays the hourly music from every Animal
          Crossing game, matched to your own clock. Free, no account, nothing to
          install.
        </p>
        <Link
          href="/"
          className="custom-pointer mt-4 inline-block rounded-full bg-[#E2826A] px-5 py-2.5 font-medium text-white transition hover:opacity-90"
        >
          Open the radio
        </Link>
      </aside>
    </article>
  );
}
