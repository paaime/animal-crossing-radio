'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Clock from '@/components/clock';
import SettingsButton from '@/components/button/SettingsButton';
import Settings from '@/components/settings';
import MusicButton from '@/components/button/MusicButton';
import MusicLibrary from '@/components/musicLibrary';
import RandomModeButton from '@/components/button/RandomButton';
import DownArrow from '@/components/icons/DownArrow';
import { useSettingsStore } from '@/stores/settings';
import { useModalStore } from '@/stores/modal';
import { getGameBySlug } from '@/utils/hourly';

const MusicPlayer = dynamic(() => import('@/components/musicPlayer'), {
  ssr: false,
});

export default function Player() {
  const { settingsOpen, libraryOpen, randomPopupOpen } = useModalStore();
  const background = useSettingsStore((state) => state.background);

  useEffect(() => {
    const url = new URL(window.location.href);
    const slug = url.searchParams.get('game');
    if (!slug) return;

    const game = getGameBySlug(slug);
    if (game) useSettingsStore.getState().setGame(game.album);

    url.searchParams.delete('game');
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, []);

  return (
    <main
      className="relative flex h-lvh flex-col items-center justify-between p-5 md:p-8"
      style={{
        backgroundImage: `url('/img/${background}.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Settings />
      {(settingsOpen || libraryOpen || randomPopupOpen) && (
        <div className="hider fixed inset-0 bg-[#00000000] z-20 backdrop-blur"></div>
      )}
      <div className="flex gap-4 self-end">
        <SettingsButton />
      </div>
      <MusicPlayer isLive={false} />
      <div className="self-start w-full flex items-end justify-between">
        <Clock />
        <div className="flex flex-col sm:flex-row gap-4">
          <RandomModeButton />
          <MusicButton />
        </div>
      </div>
      <a
        href="#about"
        className="custom-pointer absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 text-white/70 hover:text-white transition-colors text-xs"
      >
        About the radio
        <DownArrow />
      </a>
      <MusicLibrary />
    </main>
  );
}
