'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import LiveAds from '@/components/liveAds';
import Image from 'next/image';

// Video sources
// https://doradrop.com/HB6Z4x
// https://cdn.doradrop.com/videoplayback (1)-312459.mp4
// https://doradrop.com/rO89cK
// https://cdn.doradrop.com/videoplayback-263613.mp4
// https://doradrop.com/cF6QhL
// https://cdn.doradrop.com/videoplayback (3)-222961.mp4
// https://doradrop.com/JC2jEW
// https://cdn.doradrop.com/videoplayback (4)-352476.mp4
// https://doradrop.com/v1NakO
// https://cdn.doradrop.com/videoplayback (5)-990377.mp4
// https://doradrop.com/bfA05l
// https://cdn.doradrop.com/videoplayback (6)-936861.mp4
// https://doradrop.com/Xnx8g5
// https://cdn.doradrop.com/videoplayback (2)-264895.mp4

const MusicPlayer = dynamic(() => import('@/components/musicPlayer'), {
  ssr: false,
});

const videoIds = [
  'https://cdn.doradrop.com/videoplayback-263613.mp4',
  'https://cdn.doradrop.com/videoplayback (1)-312459.mp4',
  'https://cdn.doradrop.com/videoplayback (2)-264895.mp4',
  'https://cdn.doradrop.com/videoplayback (3)-222961.mp4',
  'https://cdn.doradrop.com/videoplayback (4)-352476.mp4',
  'https://cdn.doradrop.com/videoplayback (5)-990377.mp4',
  'https://cdn.doradrop.com/videoplayback (6)-936861.mp4',
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoEnd = () => {
    const newIndex = (currentVideoIndex + 1) % videoIds.length;
    setCurrentVideoIndex(newIndex);
  };

  const handleVideoError = () => {
    console.log('Video error, trying next...');
    const newIndex = (currentVideoIndex + 1) % videoIds.length;
    setCurrentVideoIndex(newIndex);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoLoadStart = () => {
    setIsLoading(true);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = parseInt(event.key);
    if (key >= 1 && key <= videoIds.length) {
      const newIndex = key - 1;
      setCurrentVideoIndex(newIndex);
    }
  };

  // Preload next video for smoother transitions (when you have multiple videos)
  useEffect(() => {
    if (videoIds.length > 1) {
      const nextIndex = (currentVideoIndex + 1) % videoIds.length;
      const nextVideo = document.createElement('video');
      nextVideo.src = videoIds[nextIndex];
      nextVideo.preload = 'metadata';
    }
  }, [currentVideoIndex]);

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
          <div className="w-full h-full bg-black/30 absolute z-10"></div>
          <video
            ref={videoRef}
            key={currentVideoIndex} // Force re-render on video change
            src={videoIds[currentVideoIndex]}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            onLoadStart={handleVideoLoadStart}
            autoPlay
            muted
            playsInline
            loop={false}
            preload="auto"
            className="w-full h-full object-cover"
            style={{
              transform: 'translateZ(0)', // Hardware acceleration hint
            }}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Image
                src="/img/celeste.png"
                alt="Loading..."
                width={1920}
                height={1080}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
        <MusicPlayer isLive />
      </main>
    </>
  );
}
