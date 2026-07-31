import Link from 'next/link';
import Image from 'next/image';
import SiteFooter from '@/components/seo/SiteFooter';

export default function HourlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-dvh bg-[#F0F2E6] text-[#4b4034]">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
        <Link href="/" className="custom-pointer flex items-center gap-3">
          <Image src="/img/icon.png" width={32} height={32} alt="" />
          <span className="font-seurat text-lg text-[#775B46]">
            Animal Crossing Radio
          </span>
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

      <main className="mx-auto max-w-3xl px-5 pb-20">{children}</main>

      <SiteFooter year={year} />
    </div>
  );
}
