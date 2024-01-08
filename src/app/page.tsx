'use client';

import Clock from '@/components/clock';
import background2 from '/public/img/background2.png';
import SettingsButton from '@/components/button/SettingsButton';
import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import Settings from '@/components/settings';
import { useSettingsStore } from '@/stores/settings';
import { GoogleAnalytics } from 'nextjs-google-analytics';

const MusicPlayer = dynamic(() => import('@/components/musicPlayer'), {
  ssr: false,
});

export default function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);
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
      {settingsOpen && <Settings setSettingsOpen={setSettingsOpen} />}
      {settingsOpen && (
        <div className="hider absolute top-0 left-0 w-full h-full bg-[#00000000] z-20 backdrop-blur"></div>
      )}
      <GoogleAnalytics gaMeasurementId="G-GBEQ7L6BRJ" trackPageViews />

      <div className="self-end">
        <SettingsButton setSettingsOpen={setSettingsOpen} />
      </div>
      <Suspense
        fallback={
          <div>
            <p className="text-white text-3xl">Loading...</p>
          </div>
        }
      >
        <MusicPlayer />
      </Suspense>
      <div className="self-start">
        <Clock />
      </div>
    </main>
  );
}
