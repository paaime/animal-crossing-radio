'use client';

import { useEffect, useRef, useState } from 'react';
import PlayButton from '../button/PlayButton';
import { convertTo12HourFormat, formatFileName } from '@/utils/time';
import { useSettingsStore } from '@/stores/settings';

export default function MusicPlayer() {
  const volume = useSettingsStore((state) => state.volume);
  const game = useSettingsStore((state) => state.game);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentHour, setCurrentHour] = useState(
    convertTo12HourFormat(new Date().getHours())
  );
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

  useEffect(() => {
    const updateStateEveryHour = () => {
      // Get the current hour
      const newHour = convertTo12HourFormat(new Date().getHours());

      // Update the music when the hour changes
      if (newHour !== currentHour) {
        setCurrentHour(newHour);
        handleChangeMusic(newHour);
      }
    };

    // Set interval to update state every hour (3600000 milliseconds = 1 hour)
    const intervalId = setInterval(updateStateEveryHour, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentHour, isPlaying, game]);

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

  return (
    <div className="flex flex-col items-center gap-2">
      <PlayButton onClick={handlePlay} isPlaying={isPlaying} />
      <audio
        loop
        controls
        ref={audioRef}
        className="hidden"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={music} type="audio/mpeg" />
      </audio>
      <div className="flex gap-3 mt-2 items-end">
        <p className="text-xl  tracking-tight">
          {game} - <span className="font-medium">{currentHour}</span>
        </p>
      </div>
    </div>
  );
}
