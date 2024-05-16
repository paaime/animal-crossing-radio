import { blogs } from '@/data/blogs';
import { IBlog } from '@/types/Blog';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog: IBlog = blogs.find((blog) => blog.slug === params.slug)!;

  if (!blog) return { title: 'Blog not found | Animal Crossing Radio' };

  return {
    title: `${blog.title} | Animal Crossing Radio`,
    description: blog.meta,
  };
}

export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const blog: IBlog = blogs.find((blog) => blog.slug === params.slug)!;

  if (!blog)
    return (
      <div className="h-screen flex items-center justify-center">
        Blog not found
      </div>
    );

  return (
    <div>
      <div className="flex flex-col gap-2 border-b border-gray-700 text-center py-5 mb-5">
        <p className="text-gray-400">{blog.date}</p>
        <h1 className="text-3xl lg:text-5xl font-semibold !leading-[2.5rem] lg:!leading-[3.5rem]">
          {blog.title}
        </h1>
      </div>
      <p className="text-lg text-gray-400 font-light mb-7">
        {blog.description}
      </p>
      <Image
        className="mt-7 mb-7 rounded-xl"
        src={blog.cover}
        alt={blog.title}
        width={1920}
        height={1080}
        priority
      />
      {blog.content.map((content: any, key: number) => {
        switch (content.type) {
          case 'title':
            return (
              <h2 key={key} className="text-xl lg:text-2xl font-semibold">
                {content.content}
              </h2>
            );
          case 'paragraph':
            return (
              <p key={key} className="text-gray-400 my-7 font-light leading-7">
                {content.content}
              </p>
            );
          case 'image':
            return (
              <Image
                key={key}
                className="mb-7 rounded-xl"
                src={content.src}
                alt={content.alt}
                width={1920}
                height={1080}
              />
            );
          case 'subtitle':
            return (
              <h3 key={key} className="text-lg lg:text-xl font-semibold ml-5">
                {content.content}
              </h3>
            );
          case 'subparagraph':
            return (
              <p
                key={key}
                className="text-gray-400 my-7 font-light leading-7 ml-5"
              >
                {content.content}
              </p>
            );
          default:
            return null;
        }
      })}
      <Link
        href="/"
        className="flex items-center justify-center gap-3 border border-x-0 border-gray-700 py-3 my-10"
      >
        <Image src="/img/icon.png" width={25} height={25} alt="logo" />
        <p>Listen Animal Crossing Radio !</p>
      </Link>
    </div>
  );
}
