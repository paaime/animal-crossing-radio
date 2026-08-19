import Link from 'next/link';
import Image from 'next/image';
import { SITE_NAME } from '@/config/site';

export default function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-5">
      <Link href="/" className="custom-pointer flex items-center gap-3">
        <Image src="/img/icon.png" width={32} height={32} alt="" />
        <span className="font-seurat text-lg text-[#775B46]">{SITE_NAME}</span>
      </Link>
      <nav>
        <ul className="flex gap-5 text-sm">
          <li>
            <Link href="/" className="custom-pointer hover:underline">
              Player
            </Link>
          </li>
          <li>
            <Link href="/hourly" className="custom-pointer hover:underline">
              Hourly
            </Link>
          </li>
          <li>
            <Link href="/blog" className="custom-pointer hover:underline">
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
