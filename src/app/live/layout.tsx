import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Stream Overlay',
  robots: { index: false, follow: true },
};

export default function LiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
