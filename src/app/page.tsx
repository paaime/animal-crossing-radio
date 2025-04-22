'use client';

import Clock from '@/components/clock';
import SettingsButton from '@/components/button/SettingsButton';
import dynamic from 'next/dynamic';
import Settings from '@/components/settings';
import { useSettingsStore } from '@/stores/settings';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import MusicButton from '@/components/button/MusicButton';
import MusicLibrary from '@/components/musicLibrary';
import RandomModeButton from '@/components/button/RandomButton';
import { useModalStore } from '@/stores/modal';

const MusicPlayer = dynamic(() => import('@/components/musicPlayer'), {
  ssr: false,
});

export default function Home() {
  const { settingsOpen, libraryOpen, randomPopupOpen } = useModalStore();
  const background = useSettingsStore((state) => state.background);

  return (
    <main
      className="flex h-dvh flex-col items-center justify-between p-5 md:p-8"
      style={{
        backgroundImage: `url('/img/${background}.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Settings />
      {(settingsOpen || libraryOpen || randomPopupOpen) && (
        <div className="hider absolute top-0 left-0 w-full h-full bg-[#00000000] z-20 backdrop-blur"></div>
      )}
      {process.env.NEXT_PUBLIC_ENV === 'production' && (
        <GoogleAnalytics gaMeasurementId="G-GBEQ7L6BRJ" trackPageViews />
      )}
      <div className="flex gap-4 self-end">
        {/* <TwitchButton /> */}
        <SettingsButton />
      </div>
      <MusicPlayer isLive={false} />
      <div className="self-start w-full flex items-end justify-between">
        <Clock />
        <div className="flex gap-4">
          <RandomModeButton />
          <MusicButton />
        </div>
      </div>
      <MusicLibrary />
    </main>
  );
}
