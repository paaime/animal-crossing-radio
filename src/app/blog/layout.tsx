import SiteHeader from '@/components/seo/SiteHeader';
import SiteFooter from '@/components/seo/SiteFooter';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-dvh bg-[#F0F2E6] text-[#4b4034]">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-5 pb-20">{children}</main>

      <SiteFooter year={year} />
    </div>
  );
}
