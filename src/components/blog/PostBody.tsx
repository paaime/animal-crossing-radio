import Image from 'next/image';
import { BlogBlock } from '@/types/Blog';

export default function PostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((block, key) => {
        switch (block.type) {
          case 'title':
            return (
              <h2
                key={key}
                className="mt-12 font-seurat text-xl text-[#775B46] md:text-2xl"
              >
                {block.content}
              </h2>
            );
          case 'paragraph':
            return (
              <p key={key} className="mt-4 leading-relaxed">
                {block.content}
              </p>
            );
          case 'subtitle':
            return (
              <h3 key={key} className="mt-8 font-medium text-[#775B46]">
                {block.content}
              </h3>
            );
          case 'subparagraph':
            return (
              <p key={key} className="mt-3 leading-relaxed text-[#5b5145]">
                {block.content}
              </p>
            );
          case 'image':
            return (
              <figure key={key} className="mt-8">
                <Image
                  className="w-full rounded-xl"
                  src={block.src}
                  alt={block.alt ?? ''}
                  width={1920}
                  height={1080}
                />
              </figure>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
