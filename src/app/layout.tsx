import type { Metadata } from 'next';
import { Inter, Poppins, Roboto } from 'next/font/google';
import './globals.css';
import React from 'react';
import dynamic from 'next/dynamic';
import { GoogleAnalytics } from 'nextjs-google-analytics';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Animal Crossing Radio',
  description:
    'Animal Crossing music from all the series in real times ! Tune in and let the soothing melodies of your favorite AC games transport you instantly!',
};

const _NoSSR = ({ children }: { children: React.ReactNode }) => (
  <React.Fragment>{children}</React.Fragment>
);

const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={process.env.NEXT_PUBLIC_BASE_PATH || '' + '/favicon.ico'}
        />
      </head>
      <body className={`${poppins.variable} ${roboto.variable} font-poppins`}>
        <NoSSR>{children}</NoSSR>
      </body>
    </html>
  );
}
