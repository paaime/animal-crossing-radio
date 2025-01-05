'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import LiveMusicName from '@/components/liveMusicName';
import LiveAds from '@/components/liveAds';
import ReactPlayer from 'react-player';

const MusicPlayer = dynamic(() => import('@/components/musicPlayer'), {
  ssr: false,
});

const vimeoIds = ['1044053960', '1044129300', '1044053968'];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    let newIndex = (currentVideoIndex + 1) % vimeoIds.length;
    setCurrentVideoIndex(newIndex);
    videoRef.current?.setAttribute('src', vimeoIds[newIndex]);
    videoRef.current?.play();
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = parseInt(event.key);
    if (key >= 1 && key <= vimeoIds.length) {
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
        <div className="absolute top-0 left-0 w-full h-full">
          <ReactPlayer
            url={`https://vimeo.com/${vimeoIds[currentVideoIndex]}`}
            onEnded={handleVideoEnd}
            playing
            volume={0}
            width={'100%'}
            height={'100%'}
            style={{ position: 'relative', zIndex: '-10' }}
          />
        </div>
        <MusicPlayer isLive />
        <LiveMusicName />
      </main>
    </>
  );
}
