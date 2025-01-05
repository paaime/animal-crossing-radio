'use client';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

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

const vimeoIds = [
  '1044053951', // Replace with your actual Vimeo video IDs
  '1044053960',
  '1044053968',
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
        {/* <video
          ref={videoRef}
          autoPlay
          muted
          // loop
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          onEnded={handleVideoEnd}
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
        </video> */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoIds[currentVideoIndex]}?background=1&autoplay=1&loop=1&byline=0&title=0`}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
        {/* <iframe
          className="w-full h-full absolute top-0 pointer-events-none z-[-1]"
          src="https://www.youtube.com/embed/VPFxZw5qUwE?mute=1&autoplay=1&controls=0&showinfo=0&rel=0&loop=1"
          title="Animal Crossing ambience - Cozy Antique café ☕ Chatters + Lo-fi Smooth Jazz Piano Music Play list 🎧"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          frameBorder={0}
          allowFullScreen
        ></iframe> */}
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
