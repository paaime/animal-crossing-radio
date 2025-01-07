'use client';

import { useEffect, useRef, useState } from 'react';
import PlayButton from '../button/PlayButton';
import { useSettingsStore } from '@/stores/settings';
import { useTimeStore } from '@/stores/time';
import { useMusicStore } from '@/stores/music';
import NextButton from '../button/NextButton';
import PrevButton from '../button/PrevButton';
import * as musicHelper from '@/utils/musicPlayer';
import StreamChoice from '../streamChoice';

export default function MusicPlayer({ isLive }: { isLive: boolean }) {
  const {
    volume,
    game,
    getWeather,
    weather,
    showExtensionMessage,
    setShowExtensionMessage,
    showLiveMessage,
    setShowLiveMessage,
  } = useSettingsStore();

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
  const audio = new Audio('/sounds/click.mp3');
  const [currentHour, setCurrentHour] = useState(`${hour} ${ampm}`);

  const [showStreamChoice, setShowStreamChoice] = useState(false);

  // Importing the musicHelper functions
  const handlePrev = () =>
    musicHelper.handlePrev(audioRef, music, setMusic, hourlyMode);
  const handleNext = () =>
    musicHelper.handleNext(
      audioRef,
      music,
      setMusic,
      hourlyMode,
      nextMode,
      isLive
    );
  const play = () => musicHelper.play(audioRef, volume);
  const pause = () => musicHelper.pause(audioRef);
  const handlePlay = () =>
    musicHelper.handlePlay(isPlaying, setIsPlaying, play, pause);
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
    if (!isLive) setHourlyMode(true);
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
        {
          src: `img/artworks/${music.album}/192x192.png`,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: `img/artworks/${music.album}/512x512.png`,
          sizes: '512x512',
          type: 'image/png',
        },
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
      {!isLive && (
        <div className="flex gap-5 items-center">
          {!hourlyMode && <PrevButton onClick={handlePrev} />}
          <PlayButton onClick={handlePlay} isPlaying={isPlaying} />
          {!hourlyMode && <NextButton onClick={handleNext} />}
        </div>
      )}
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
        {!isLive && (
          <h1 className="text-lg tracking-tight text-center">
            {music.album} - <span className="font-medium">{music.name}</span>
          </h1>
        )}
        {!hourlyMode && !isLive && (
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
        {/* {showExtensionMessage && (
          <div className="mt-3 group">
            <span className="bg-purple-400 rounded-full py-1 px-3 text-sm font-semibold mr-2">
              NEW
            </span>
            <Link
              href="https://chromewebstore.google.com/detail/animal-crossing-radio-liv/nffhjilgaekcabipkpjkfnkmdacnnink"
              target="_blank"
              className="custom-pointer text-white group-hover:underline"
            >
              Chrome extension is <span className="font-semibold">here</span> !
            </Link>
            <span
              className="custom-pointer ml-2 text-xs hover:underline"
              onClick={() => setShowExtensionMessage(false)}
            >
              ( hide )
            </span>
          </div>
        )} */}
        {/* {showLiveMessage && !isLive && (
          <div className="flex items-center mt-3 group">
            <span className="bg-purple-400 rounded-full py-1 px-2 sm:px-3 text-xs sm:text-sm font-semibold mr-2">
              NEW
            </span>
            <p
              className="custom-pointer text-white group-hover:underline text-xs sm:text-base"
              onClick={() => {
              audio.play();
                setShowStreamChoice(true);
              }}
            >
              24/7 live on <span className="font-semibold">Youtube</span> and{' '}
              <span className="font-semibold">Twitch</span> !
            </p>
            <span
              className="custom-pointer ml-2 text-xs hover:underline"
              onClick={() => setShowLiveMessage(false)}
            >
              ( hide )
            </span>
          </div>
        )} */}
        <StreamChoice open={showStreamChoice} setOpen={setShowStreamChoice} />
      </div>
    </div>
  );
}
