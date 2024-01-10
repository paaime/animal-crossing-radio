'use client';

import { useEffect, useRef, useState } from 'react';
import PlayButton from '../button/PlayButton';
import { formatFileName } from '@/utils/time';
import { useSettingsStore } from '@/stores/settings';
import { useTimeStore } from '@/stores/time';

export default function MusicPlayer() {
  const volume = useSettingsStore((state) => state.volume);
  const game = useSettingsStore((state) => state.game);

  const { hour, ampm } = useTimeStore((state) => state);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentHour, setCurrentHour] = useState(`${hour} ${ampm}`);
  const [music, setMusic] = useState(formatFileName(currentHour, game));

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    // change the music when the game changes
    handleChangeMusic();
  }, [game]);

  useEffect(() => {
    // when the user hit the space bar, play/pause the music
    const handleSpaceBar = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        handlePlay();
      }
    };

    document.addEventListener('keydown', handleSpaceBar);

    return () => {
      document.removeEventListener('keydown', handleSpaceBar);
    };
  }, [isPlaying]);

  const updateMusic = () => {
    // Get the current hour
    let newHour = `${hour} ${ampm}`;

    // Update the music when the hour changes
    if (newHour !== currentHour) {
      setCurrentHour(newHour);
      handleChangeMusic(newHour);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updateMusic, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentHour, isPlaying, game]);

  useEffect(() => {
    updateMusic();
  }, [hour]);

  const fadeOut = () => {
    if (audioRef.current) {
      while (audioRef.current.volume > 0) {
        audioRef.current.volume -= Math.min(audioRef.current.volume, 0.01);
        // setTimeout(fadeOut, 2);
      }
      audioRef.current.pause();
      // } else {
      //   audioRef.current.pause();
      // }
    }
  };

  const fadeIn = () => {
    if (audioRef.current) {
      if (audioRef.current.volume < volume / 100) {
        audioRef.current.volume += Math.min(1 - audioRef.current.volume, 0.01);
        setTimeout(fadeIn, 2);
      }
      audioRef.current.play();
    }
  };

  const handlePlay = () => {
    if (isPlaying) {
      // fadeOut();
      audioRef.current?.pause();
    } else {
      fadeIn();
    }
    setIsPlaying(!isPlaying);
  };

  const handleChangeMusic = (newHour = currentHour) => {
    if (audioRef.current) {
      let newMusic = formatFileName(newHour, game);
      fadeOut();
      audioRef.current.src = newMusic;
      audioRef.current.load();
      setMusic(newMusic);
      if (isPlaying) {
        fadeIn();
      }
    }
  };

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: game + ' - ' + currentHour,
      artist: 'Animal Crossing Radio',
      album: 'Animal Crossing Radio',
      artwork: [
        { src: '/img/icon.png', sizes: '192x192', type: 'image/png' },
        { src: '/img/icon.png', sizes: '512x512', type: 'image/png' },
      ],
    });

    navigator.mediaSession.setActionHandler('play', () => {
      handlePlay();
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      handlePlay();
    });
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <PlayButton onClick={handlePlay} isPlaying={isPlaying} />
      <audio
        loop
        ref={audioRef}
        className="hidden"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={music} type="audio/mpeg" />
      </audio>
      <div className="flex gap-3 mt-2 items-end">
        <p className="text-lg tracking-tight">
          {game} - <span className="font-medium">{currentHour}</span>
        </p>
      </div>
    </div>
  );
}
