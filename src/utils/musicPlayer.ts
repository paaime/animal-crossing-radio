import { IMusic } from '@/types/Music';
import { albums } from '@/data/albums';
import { NextMode } from '@/types/Enum';
import { SetStateAction } from 'react';
import { liveAlbums } from '@/data/liveAlbums';

export const handlePrev = (
  audioRef: React.RefObject<HTMLAudioElement>,
  music: IMusic,
  setMusic: (music: IMusic) => void,
  hourlyMode: boolean,
  nextMode: NextMode,
  excludedAlbums: string[] = []
) => {
  if (audioRef.current) {
    if (!hourlyMode && music.index !== null) {
      const album = albums.find((album) => album.name === music.album);
      let prevAlbum = album; // Default to the current album

      if (album) {
        let prevIndex;
        let prevMusic: { name: string };

        switch (nextMode) {
          case NextMode.NEXT: {
            prevIndex =
              music.index <= 0 ? album.sounds.length - 1 : music.index - 1;
            prevMusic = album.sounds[prevIndex];
            break;
          }
          case NextMode.RANDOM: {
            prevIndex = Math.floor(Math.random() * album.sounds.length);
            prevMusic = album.sounds[prevIndex];
            break;
          }
          case NextMode.REPEAT: {
            prevIndex = music.index;
            prevMusic = album.sounds[prevIndex];
            break;
          }
          case NextMode.RANDOM_ALBUM: {
            const randomAlbum = albums.filter(
              (album) => !excludedAlbums.includes(album.name)
            );
            prevAlbum =
              randomAlbum[Math.floor(Math.random() * randomAlbum.length)];
            let availableSounds = [...prevAlbum.sounds]; // Start with all sounds
            const nonWeatherSounds = availableSounds.filter(
              (sound) =>
                !sound.name.includes('🌧️') && !sound.name.includes('❄️')
            );

            availableSounds = nonWeatherSounds;

            prevIndex = Math.floor(Math.random() * availableSounds.length);
            prevMusic = availableSounds[prevIndex];
            prevIndex = prevAlbum.sounds.findIndex(
              (sound) => sound.name === prevMusic.name
            );
            break;
          }
          case NextMode.RANDOM_ALBUM_WEATHER: {
            const randomAlbum = albums.filter(
              (album) => !excludedAlbums.includes(album.name)
            );
            prevAlbum = randomAlbum[
              Math.floor(Math.random() * randomAlbum.length)
            ] as typeof album;
            prevIndex = Math.floor(Math.random() * prevAlbum.sounds.length);
            prevMusic = prevAlbum.sounds[prevIndex];
            break;
          }
        }

        setMusic({
          album: prevAlbum?.name!,
          name: prevMusic.name,
          index: prevIndex,
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
  nextMode: NextMode,
  isLive: boolean,
  excludedAlbums: string[]
) => {
  if (audioRef.current) {
    if (!hourlyMode && music.index !== null) {
      const album = albums.find((album) => album.name === music.album);
      let nextAlbum = album; // Default to the current album

      if (album) {
        let nextIndex;
        let nextMusic: { name: string };
        switch (nextMode) {
          case NextMode.NEXT: {
            nextIndex = (music.index + 1) % album.sounds.length;
            nextMusic = album.sounds[nextIndex];
            break;
          }
          case NextMode.RANDOM: {
            if (isLive) {
              nextAlbum =
                liveAlbums[Math.floor(Math.random() * liveAlbums.length)];
              nextIndex = Math.floor(Math.random() * nextAlbum.sounds.length);
              nextMusic = nextAlbum.sounds[nextIndex];
            } else {
              nextIndex = Math.floor(Math.random() * album.sounds.length);
              nextMusic = album.sounds[nextIndex];
            }
            break;
          }
          case NextMode.REPEAT: {
            nextIndex = music.index;
            nextMusic = album.sounds[nextIndex];
            break;
          }
          case NextMode.RANDOM_ALBUM: {
            const randomAlbum = albums.filter(
              (album) => !excludedAlbums.includes(album.name)
            );
            nextAlbum =
              randomAlbum[Math.floor(Math.random() * randomAlbum.length)];
            let availableSounds = [...nextAlbum.sounds]; // Start with all sounds
            const nonWeatherSounds = availableSounds.filter(
              (sound) =>
                !sound.name.includes('🌧️') && !sound.name.includes('❄️')
            );

            availableSounds = nonWeatherSounds;

            nextIndex = Math.floor(Math.random() * availableSounds.length);
            nextMusic = availableSounds[nextIndex];
            nextIndex = nextAlbum.sounds.findIndex(
              (sound) => sound.name === nextMusic.name
            );
            break;
          }
          case NextMode.RANDOM_ALBUM_WEATHER: {
            const randomAlbum = albums.filter(
              (album) => !excludedAlbums.includes(album.name)
            );
            nextAlbum = randomAlbum[
              Math.floor(Math.random() * randomAlbum.length)
            ] as typeof album;
            nextIndex = Math.floor(Math.random() * nextAlbum.sounds.length);
            nextMusic = nextAlbum.sounds[nextIndex];
            break;
          }
        }

        setMusic({
          album: nextAlbum?.name!,
          name: nextMusic.name,
          index: nextIndex,
        });
      }
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
  handleChangeMusic: () => void,
  getWeather: () => string
) => {
  if (!hourlyMode) return;
  // Get the current hour
  let newHour = `${hour} ${ampm}${getWeather()}`;
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
  }
};
