'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import LiveMusicName from '@/components/liveMusicName';
import LiveAds from '@/components/liveAds';
import ReactPlayer from 'react-player';

const MusicPlayer = dynamic(() => import('@/components/musicPlayer'), {
  ssr: false,
});

const videoIds = [
  // 'https://youtu.be/9QU5HFXlsPM?t=34',
  'https://youtu.be/CBG0Px9oaWY',
  'https://youtu.be/sykEDY-wmxw',
  'https://youtu.be/b9s_PfMWsbg?t=29',
  'https://youtu.be/u-4NV0jn2Lc',
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    let newIndex = (currentVideoIndex + 1) % videoIds.length;
    setCurrentVideoIndex(newIndex);
    videoRef.current?.setAttribute('src', videoIds[newIndex]);
    videoRef.current?.play();
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = parseInt(event.key);
    if (key >= 1 && key <= videoIds.length) {
      const newIndex = key - 1;
      setCurrentVideoIndex(newIndex);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      <main className="flex h-dvh flex-col items-center justify-between p-5 md:p-8 cursor-none">
        <LiveAds />
        <div className="absolute h-full w-full top-0 overflow-hidden aspect-video pointer-events-none z-[-10]">
          <ReactPlayer
            url={videoIds[currentVideoIndex]}
            onEnded={handleVideoEnd}
            playing
            playsinline
            volume={0}
            width={'100%'}
            height={'100%'}
            className="iframe-player"
          />
        </div>
        <MusicPlayer isLive />
        <LiveMusicName />
      </main>
    </>
  );
}
