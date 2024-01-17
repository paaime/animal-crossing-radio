'use client';

import { useEffect, useRef, useState } from 'react';
import PlayButton from '../button/PlayButton';
import { useSettingsStore } from '@/stores/settings';
import { useTimeStore } from '@/stores/time';
import { useMusicStore } from '@/stores/music';
import NextButton from '../button/NextButton';
import PrevButton from '../button/PrevButton';
import * as musicHelper from '@/utils/musicPlayer';

export default function MusicPlayer() {
  const { volume, game, getWeather, weather } = useSettingsStore();

  const {
    music,
    hourlyMode,
    nextMode,
    setMusic,
    getMusicPath,
    setHourlyMusic,
    setHourlyMode,
  } = useMusicStore((state) => state);

  const { hour, ampm } = useTimeStore((state) => state);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentHour, setCurrentHour] = useState(`${hour} ${ampm}`);

  // Importing the musicHelper functions
  const handlePrev = () =>
    musicHelper.handlePrev(audioRef, music, setMusic, hourlyMode);
  const handleNext = () =>
    musicHelper.handleNext(audioRef, music, setMusic, hourlyMode, nextMode);
  const play = () => musicHelper.play(audioRef, volume);
  const pause = () => musicHelper.pause(audioRef);
  const handlePlay = () =>
    musicHelper.handlePlay(isPlaying, setIsPlaying, play, pause);
  const setMediaSession = () => musicHelper.setMediaSession(music, handlePlay);
  const handleChangeMusic = () =>
    musicHelper.handleChangeMusic(
      audioRef,
      getMusicPath,
      isPlaying,
      setIsPlaying,
      play,
      pause,
      hourlyMode
    );
  const updateMusic = () =>
    musicHelper.updateMusic(
      hourlyMode,
      setMusic,
      setCurrentHour,
      hour,
      ampm,
      currentHour,
      game,
      handleChangeMusic,
      getWeather
    );

  useEffect(() => {
    if (!hourlyMode) {
      handleChangeMusic();
    }
  }, [music]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    // change the music when the game changes
    setMusic({
      album: game,
      name: `${hour} ${ampm}${getWeather()}`,
      index: null,
    });
    setHourlyMode(true);
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
    const intervalId = setInterval(updateMusic, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentHour, isPlaying, game, hourlyMode]);

  useEffect(() => {
    updateMusic();
  }, [hour]);

  useEffect(() => {
    updateMusic();
  }, [weather]);

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: music.album + ' - ' + music.name,
      artist: 'Animal Crossing Radio',
      album: 'Animal Crossing Radio',
      artwork: [
        { src: '/img/icon192.png', sizes: '192x192', type: 'image/png' },
        { src: '/img/icon512.png', sizes: '512x512', type: 'image/png' },
      ],
    });

    navigator.mediaSession.setActionHandler('play', () => {
      handlePlay();
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      handlePlay();
    });

    if (!hourlyMode) {
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        handleNext();
      });
    }

    if (!hourlyMode) {
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        handlePrev();
      });
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-5 items-center">
        {!hourlyMode && <PrevButton onClick={handlePrev} />}
        <PlayButton onClick={handlePlay} isPlaying={isPlaying} />
        {!hourlyMode && <NextButton onClick={handleNext} />}
      </div>
      <audio
        ref={audioRef}
        className="hidden"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onEnded={handleNext}
      >
        <source
          src={`/sounds/${music.album}/${music.name}.mp3`}
          type="audio/mpeg"
        />
      </audio>
      <div className="flex gap-1 mt-2 items-center flex-col text-white">
        <h1 className="text-lg tracking-tight text-center">
          {music.album} - <span className="font-medium">{music.name}</span>
        </h1>
        {!hourlyMode && (
          <p
            className="text-sm hover:underline custom-pointer"
            onClick={() => {
              setHourlyMusic();
              handleChangeMusic();
            }}
          >
            Switch to <span className="font-medium">Hourly Mode</span>
          </p>
        )}
      </div>
    </div>
  );
}
