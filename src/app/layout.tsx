import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import StoreHydration from '@/components/StoreHydration';
import Analytics from '@/components/Analytics';
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  OG_IMAGE,
} from '@/config/site';

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Animal Crossing Radio | Live Hourly Animal Crossing Music',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@crossing_radio_',
  },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href={`${basePath}/img/icon192.png`} />
        <link rel="manifest" href={`${basePath}/manifest.json`} />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={`${basePath}/favicon.ico`}
        />
      </head>
      <body
        className={`${poppins.variable} ${seurat.variable} ${bokutoh.variable} font-poppins`}
      >
        <StoreHydration />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
