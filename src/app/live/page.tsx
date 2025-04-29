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
  'https://youtu.be/QJvFojp2oEI?t=26',
  'https://youtu.be/TjC92khsso4?t=15',
  'https://youtu.be/DHtplTxNQkE?t=27',
  'https://youtu.be/lVehsRqmQqs?t=15',
  'https://www.youtube.com/watch?v=GsY331YBUkg',
  'https://www.youtube.com/watch?v=Y6uJH3ubEuY',
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
          <div className="w-full h-full bg-black/30 absolute"></div>
          <ReactPlayer
            url={videoIds[currentVideoIndex]}
            onEnded={handleVideoEnd}
            playing
            playsinline
            volume={0}
            width={'100%'}
            height={'100%'}
            className="iframe-player"
            onUnstarted={() => {
              let newIndex = (currentVideoIndex + 1) % videoIds.length;
              setCurrentVideoIndex(newIndex);
              videoRef.current?.setAttribute('src', videoIds[newIndex]);
              videoRef.current?.play();
            }}
            onError={() => {
              let newIndex = (currentVideoIndex + 1) % videoIds.length;
              setCurrentVideoIndex(newIndex);
              videoRef.current?.setAttribute('src', videoIds[newIndex]);
              videoRef.current?.play();
            }}
          />
        </div>
        <MusicPlayer isLive />
      </main>
    </>
  );
}
