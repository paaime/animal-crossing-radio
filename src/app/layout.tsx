import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import React from 'react';
import dynamic from 'next/dynamic';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

const seurat = localFont({
  src: [
    {
      path: '../../public/fonts/SeuratBold.otf',
      weight: 'bold',
    },
    {
      path: '../../public/fonts/SeuratNormal.otf',
      weight: 'normal',
    },
  ],
  variable: '--font-seurat',
});

const bokutoh = localFont({
  src: [
    {
      path: '../../public/fonts/Bokutoh.otf',
      weight: 'normal',
    },
  ],
  variable: '--font-bokutoh',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://animal-crossing-radio.com'),
  title: 'Animal Crossing Radio | Live Hourly Animal Crossing Music',
  description:
    'Animal Crossing music from all the games in live ! Enjoy the best hourly Animal Crossing music right now ! If you love this game, this radio is made for you !',
  openGraph: {
    type: 'website',
    url: 'https://animal-crossing-radio.com',
    images: [
      {
        url: '/img/og-image.png',
        width: 800,
        height: 600,
        alt: 'Animal Crossing Radio',
      },
    ],
  },
};

const _NoSSR = ({ children }: { children: React.ReactNode }) => (
  <React.Fragment>{children}</React.Fragment>
);

const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false,
});

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
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
      <body
        className={`${poppins.variable} ${seurat.variable} ${bokutoh.variable} font-poppins`}
      >
        <NoSSR>{children}</NoSSR>
      </body>
    </html>
  );
}
