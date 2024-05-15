'use client';

import Header from '@/components/blog/Header';
import RedditIcon from '@/components/icons/RedditIcon';
import XIcon from '@/components/icons/XIcon';
import Link from 'next/link';
import { GoogleAnalytics } from 'nextjs-google-analytics';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();
  return (
    <div className="bg-gray-950 text-white px-5 min-h-screen">
      {process.env.NEXT_PUBLIC_ENV === 'production' && (
        <GoogleAnalytics gaMeasurementId="G-GBEQ7L6BRJ" trackPageViews />
      )}
      <div className="max-w-3xl xl:max-w-5xl mx-auto">
        <Header />
        {children}
      </div>
      <footer className="flex flex-col items-center gap-5 max-w-3xl mx-auto pb-10">
        <div className="flex items-center gap-5">
          <Link href={'https://twitter.com/crossing_radio_'} target="_blank">
            <XIcon />
          </Link>
          <Link
            href={'https://www.reddit.com/user/AnimalCrossingRadio'}
            target="_blank"
          >
            <RedditIcon />
          </Link>
        </div>
        <p className="text-gray-400 font-light text-sm">
          Animal Crossing Radio • © {year}
        </p>
      </footer>
    </div>
  );
}
