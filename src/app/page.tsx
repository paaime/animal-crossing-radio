'use client';

import Clock from '@/components/clock';
import SettingsButton from '@/components/button/SettingsButton';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Settings from '@/components/settings';
import { useSettingsStore } from '@/stores/settings';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import MusicButton from '@/components/button/MusicButton';
import MusicLibrary from '@/components/musicLibrary';

const MusicPlayer = dynamic(() => import('@/components/musicPlayer'), {
  ssr: false,
});

export default function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
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
      <Settings settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />
      {(settingsOpen || libraryOpen) && (
        <div className="hider absolute top-0 left-0 w-full h-full bg-[#00000000] z-20 backdrop-blur"></div>
      )}
      {process.env.NEXT_PUBLIC_ENV === 'production' && (
        <GoogleAnalytics gaMeasurementId="G-GBEQ7L6BRJ" trackPageViews />
      )}
      <div className="self-end">
        <SettingsButton setSettingsOpen={setSettingsOpen} />
      </div>
      <MusicPlayer />
      <div className="self-start w-full flex items-end justify-between">
        <Clock />
        <MusicButton setLibraryOpen={setLibraryOpen} />
      </div>
      <MusicLibrary open={libraryOpen} setLibraryOpen={setLibraryOpen} />
    </main>
  );
}
