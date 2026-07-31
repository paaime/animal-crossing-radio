import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="bg-[#F0F2E6] text-[#4b4034]">
      <div className="min-h-dvh mx-auto flex max-w-2xl flex-col justify-center items-center px-5 py-24 text-center">
        <Image src="/img/icon.png" width={64} height={64} alt="" />

        <h1 className="mt-6 font-seurat text-3xl md:text-4xl text-[#775B46]">
          This page took a boat to another island
        </h1>
        <p className="mt-4 text-[#5b5145]">
          We could not find what you were looking for. The music is still
          playing, though.
        </p>

        <Link
          href="/"
          className="custom-pointer mt-8 rounded-full bg-[#E2826A] px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          Back to the radio
        </Link>
      </div>
    </main>
  );
}
