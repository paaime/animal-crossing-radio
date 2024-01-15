import { IAlbum } from '@/types/Album';
import { IMusic } from '@/types/Music';
import { albums } from '@/data/albums';
import { NextMode } from '@/types/Enum';
import { SetStateAction } from 'react';

export const handlePrev = (
  audioRef: React.RefObject<HTMLAudioElement>,
  music: IMusic,
  setMusic: (music: IMusic) => void,
  hourlyMode: boolean
) => {
  if (audioRef.current) {
    if (!hourlyMode && music.index !== null) {
      const album = albums.find((album) => album.name === music.album);

      if (album) {
        const nextIndex =
          music.index <= 0 ? album.sounds.length - 1 : music.index - 1;
        const nextMusic = album.sounds[nextIndex];

        setMusic({
          album: music.album,
          name: nextMusic.name,
          index: nextIndex,
        });
      }
      audioRef.current.play();
    } else {
      audioRef.current.play();
    }
  }
};

export const handleNext = (
  audioRef: React.RefObject<HTMLAudioElement>,
  music: IMusic,
  setMusic: (music: IMusic) => void,
  hourlyMode: boolean,
  nextMode: NextMode
) => {
  if (audioRef.current) {
    if (!hourlyMode && music.index !== null) {
      const album = albums.find((album) => album.name === music.album);

      if (album) {
        let nextIndex;
        let nextMusic;
        switch (nextMode) {
          case NextMode.NEXT: {
            nextIndex = (music.index + 1) % album.sounds.length;
            nextMusic = album.sounds[nextIndex];
            break;
          }
          case NextMode.RANDOM: {
            nextIndex = Math.floor(Math.random() * album.sounds.length);
            nextMusic = album.sounds[nextIndex];
            break;
          }
          case NextMode.REPEAT: {
            nextIndex = music.index;
            nextMusic = album.sounds[nextIndex];
            break;
          }
        }

        setMusic({
          album: music.album,
          name: nextMusic.name,
          index: nextIndex,
        });
      }
      // audioRef.current.play();
    } else {
      audioRef.current.play();
    }
  }
};

export const play = (
  audioRef: React.RefObject<HTMLAudioElement>,
  volume: number
) => {
  if (audioRef.current) {
    audioRef.current.volume = volume / 100;
    audioRef.current.play();
  }
};

export const pause = (audioRef: React.RefObject<HTMLAudioElement>) => {
  if (audioRef.current) {
    while (audioRef.current.volume > 0) {
      audioRef.current.volume -= Math.min(audioRef.current.volume, 0.01);
    }
    audioRef.current.pause();
  }
};

export const handlePlay = (
  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void,
  play: () => void,
  pause: () => void
) => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
  setIsPlaying(!isPlaying);
};

export const handleChangeMusic = (
  audioRef: React.RefObject<HTMLAudioElement>,
  getMusicPath: () => string,
  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void,
  play: () => void,
  pause: () => void,
  hourlyMode: boolean
) => {
  if (audioRef.current) {
    pause();
    audioRef.current.src = getMusicPath();
    audioRef.current.load();
    if (isPlaying) {
      play();
    } else {
      if (!hourlyMode) {
        setIsPlaying(true);
        play();
      }
    }
  }
};

export const updateMusic = (
  hourlyMode: boolean,
  setMusic: (music: IMusic) => void,
  setCurrentHour: (value: SetStateAction<string>) => void,
  hour: number,
  ampm: string,
  currentHour: string,
  game: string,
  handleChangeMusic: () => void
) => {
  if (!hourlyMode) return;
  // Get the current hour
  let newHour = `${hour} ${ampm}`;
  // Update the music when the hour changes
  if (newHour !== currentHour) {
    setMusic({
      album: game,
      name: newHour,
      index: null,
    });
    setCurrentHour(newHour);
    handleChangeMusic();
  }
};

export const setMediaSession = (music: IMusic, handlePlay: () => void) => {
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
  }
};
