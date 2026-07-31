import type { Metadata } from 'next';
import Player from '@/components/player';
import HomeContent from '@/components/seo/HomeContent';
import { SITE_DESCRIPTION } from '@/config/site';
import { pageMetadata } from '@/config/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Animal Crossing Radio | Live Hourly Animal Crossing Music',
  description: SITE_DESCRIPTION,
  path: '/',
});

export default function Home() {
  return (
    <>
      <Player />
      <HomeContent />
    </>
  );
}
