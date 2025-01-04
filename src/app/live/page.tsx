'use client';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Settings from '@/components/settings';

import LiveMusicName from '@/components/liveMusicName';
import LiveAds from '@/components/liveAds';

const MusicPlayer = dynamic(() => import('@/components/musicPlayer'), {
  ssr: false,
});

const videoSources = [
  '/video/live-bg-0.mp4',
  '/video/live-bg-1.mp4',
  '/video/live-bg-2.mp4',
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    let newIndex = (currentVideoIndex + 1) % videoSources.length;
    setCurrentVideoIndex(newIndex);
    videoRef.current?.setAttribute('src', videoSources[newIndex]);
    videoRef.current?.play();
  };

  return (
    <>
      <main className="flex h-dvh flex-col items-center justify-between p-5 md:p-8 cursor-none">
        <LiveAds />
        <video
          ref={videoRef}
          autoPlay
          muted
          // loop
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          onEnded={handleVideoEnd}
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
        </video>
        {/* <Settings
          settingsOpen={settingsOpen}
          setSettingsOpen={setSettingsOpen}
        /> */}
        <MusicPlayer isLive />
        {/* <div className="self-start w-full flex items-end justify-between">
          <MusicButton setLibraryOpen={setLibraryOpen} />
        </div> */}
        {/* <MusicLibrary open={libraryOpen} setLibraryOpen={setLibraryOpen} /> */}
        <LiveMusicName />
      </main>
    </>
  );
}
