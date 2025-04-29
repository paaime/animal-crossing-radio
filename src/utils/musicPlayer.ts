import { IMusic } from '@/types/Music';
import { albums } from '@/data/albums';
import { NextMode } from '@/types/Enum';
import { SetStateAction } from 'react';
import { liveAlbums } from '@/data/liveAlbums';

const recentlyPlayed: string[] = [];
const HISTORY_LIMIT = 10;

function updateRecentlyPlayed(trackName: string, albumName: string) {
  const uniqueId = `${albumName}:${trackName}`;
  recentlyPlayed.push(uniqueId);
  if (recentlyPlayed.length > HISTORY_LIMIT) {
    recentlyPlayed.shift();
  }
}

function selectRandomTrackFromAlbums(
  albums: any[],
  excludedAlbums: string[],
  includeWeather: boolean,
  currentAlbum: any
) {
  // Filter available albums
  const availableAlbums = albums.filter(
    (album) => !excludedAlbums.includes(album.name)
  );

  if (availableAlbums.length === 0) {
    const randomSound = getRandomTrack(currentAlbum.sounds);
    return {
      album: currentAlbum,
      sound: randomSound,
      index: currentAlbum.sounds.findIndex(
        (sound: { name: string }) => sound.name === randomSound.name
      ),
    };
  }

  // Create a flat list of all sounds from all available albums
  const allSounds = availableAlbums.flatMap((album) => {
    const filteredSounds = includeWeather
      ? album.sounds
      : album.sounds.filter(
          (sound: { name: string }) =>
            !sound.name.includes('🌧️') && !sound.name.includes('❄️')
        );

    return filteredSounds.map((sound: any) => ({
      sound,
      album,
      uniqueId: `${album.name}_${sound.name}`, // Create a unique identifier
    }));
  });

  if (allSounds.length === 0) {
    const randomSound = getRandomTrack(currentAlbum.sounds);
    return {
      album: currentAlbum,
      sound: randomSound,
      index: currentAlbum.sounds.findIndex(
        (sound: { name: string }) => sound.name === randomSound.name
      ),
    };
  }

  const tracksWithIds = allSounds.map((item) => ({
    name: item.sound.name,
    albumId: item.album.name,
  }));

  // Get random track from combined pool
  const randomTrack = getRandomTrack(tracksWithIds);

  // Find the complete track info using both name AND album
  const trackInfo = allSounds.find(
    (item) =>
      item.sound.name === randomTrack.name &&
      item.album.name === randomTrack.albumId
  );

  const fallbackTrackInfo =
    trackInfo || allSounds.find((item) => item.sound.name === randomTrack.name);

  if (fallbackTrackInfo) {
    return {
      album: fallbackTrackInfo.album,
      sound: fallbackTrackInfo.sound,
      index: fallbackTrackInfo.album.sounds.findIndex(
        (sound: { name: string }) => sound.name === fallbackTrackInfo.sound.name
      ),
    };
  } else {
    const randomSound = getRandomTrack(currentAlbum.sounds);
    return {
      album: currentAlbum,
      sound: randomSound,
      index: currentAlbum.sounds.findIndex(
        (sound: { name: string }) => sound.name === randomSound.name
      ),
    };
  }
}

// Helper to get a random track not in history
function getRandomTrack(tracks: { name: string; albumId?: string }[]) {
  const available = tracks.filter((track) => {
    if (track.albumId) {
      return !recentlyPlayed.includes(`${track.albumId}:${track.name}`);
    }
    return !recentlyPlayed.some((item) => item.endsWith(`:${track.name}`));
  });

  if (available.length === 0) {
    recentlyPlayed.length = 0;
    return tracks[Math.floor(Math.random() * tracks.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

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
            prevMusic = getRandomTrack(album.sounds);
            prevIndex = album.sounds.findIndex(
              (sound) => sound.name === prevMusic.name
            );
            break;
          }
          case NextMode.REPEAT: {
            prevIndex = music.index;
            prevMusic = album.sounds[prevIndex];
            break;
          }
          case NextMode.RANDOM_ALBUM: {
            const result = selectRandomTrackFromAlbums(
              albums,
              excludedAlbums,
              false,
              album
            );

            prevAlbum = result.album;
            prevMusic = result.sound;
            prevIndex = result.index;
            break;
          }
          case NextMode.RANDOM_ALBUM_WEATHER: {
            const result = selectRandomTrackFromAlbums(
              albums,
              excludedAlbums,
              true,
              album
            );

            prevAlbum = result.album;
            prevMusic = result.sound;
            prevIndex = result.index;
            break;
          }
        }

        setMusic({
          album: prevAlbum?.name!,
          name: prevMusic.name,
          index: prevIndex,
        });
        updateRecentlyPlayed(prevMusic.name, prevAlbum?.name!);
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
  excludedAlbums: string[],
  volume: number
) => {
  if (audioRef.current) {
    if (!hourlyMode && music.index !== null) {
      const album = albums.find((album) => album.name === music.album);
      let nextAlbum = album;
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
            nextMusic = getRandomTrack(album.sounds);
            nextIndex = album.sounds.findIndex(
              (sound) => sound.name === nextMusic.name
            );
            break;
          }
          case NextMode.REPEAT: {
            nextIndex = music.index;
            nextMusic = album.sounds[nextIndex];
            break;
          }
          case NextMode.RANDOM_ALBUM: {
            const result = selectRandomTrackFromAlbums(
              isLive ? liveAlbums : albums,
              isLive ? [] : excludedAlbums,
              false,
              album
            );

            nextAlbum = result.album;
            nextMusic = result.sound;
            nextIndex = result.index;
            break;
          }
          case NextMode.RANDOM_ALBUM_WEATHER: {
            const result = selectRandomTrackFromAlbums(
              albums,
              excludedAlbums,
              true,
              album
            );

            nextAlbum = result.album;
            nextMusic = result.sound;
            nextIndex = result.index;
            break;
          }
        }

        setMusic({
          album: nextAlbum?.name!,
          name: nextMusic.name,
          index: nextIndex,
        });
        updateRecentlyPlayed(nextMusic.name, nextAlbum?.name!);
      }
    } else {
      // Fade out, reload, and fade in for hourly mode looping
      const fadeOut = (callback: () => void) => {
        let vol = audioRef.current!.volume;
        const step = 0.05;
        const fade = () => {
          if (vol > 0.05) {
            vol -= step;
            audioRef.current!.volume = Math.max(vol, 0);
            setTimeout(fade, 20);
          } else {
            audioRef.current!.volume = 0;
            callback();
          }
        };
        fade();
      };

      const fadeIn = () => {
        let vol = 0;
        const target = volume / 100;
        const step = 0.05;
        audioRef.current!.volume = 0;
        const fade = () => {
          if (vol < target) {
            vol += step;
            audioRef.current!.volume = Math.min(vol, target);
            setTimeout(fade, 20);
          }
        };
        fade();
      };

      fadeOut(() => {
        audioRef.current!.currentTime = 0;
        audioRef.current!.play();
        fadeIn();
      });
    }
  }
};

export const play = (
  audioRef: React.RefObject<HTMLAudioElement>,
  volume: number
) => {
  if (audioRef.current) {
    // Fade in
    let vol = 0;
    const target = volume / 100;
    const step = 0.05;
    audioRef.current.volume = 0;
    audioRef.current.play();
    const fade = () => {
      if (vol < target) {
        vol += step;
        audioRef.current!.volume = Math.min(vol, target);
        setTimeout(fade, 20);
      }
    };
    fade();
  }
};

export const pause = (audioRef: React.RefObject<HTMLAudioElement>) => {
  if (audioRef.current) {
    // Fade out
    let vol = audioRef.current.volume;
    const step = 0.05;
    const fade = () => {
      if (vol > 0.05) {
        vol -= step;
        audioRef.current!.volume = Math.max(vol, 0);
        setTimeout(fade, 20);
      } else {
        audioRef.current!.volume = 0;
        audioRef.current!.pause();
      }
    };
    fade();
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
  hourlyMode: boolean,
  volume: number
) => {
  if (audioRef.current) {
    // Fade out
    const fadeOut = (callback: () => void) => {
      let vol = audioRef.current!.volume;
      const step = 0.05;
      const fade = () => {
        if (vol > 0.05) {
          vol -= step;
          audioRef.current!.volume = Math.max(vol, 0);
          setTimeout(fade, 20);
        } else {
          audioRef.current!.volume = 0;
          callback();
        }
      };
      fade();
    };

    // Fade in
    const fadeIn = () => {
      let vol = 0;
      const target = volume / 100;
      const step = 0.05;
      audioRef.current!.volume = 0;
      const fade = () => {
        if (vol < target) {
          vol += step;
          audioRef.current!.volume = Math.min(vol, target);
          setTimeout(fade, 20);
        }
      };
      fade();
    };

    fadeOut(() => {
      pause();
      audioRef.current!.src = getMusicPath();
      audioRef.current!.load();
      if (isPlaying || !hourlyMode) {
        setIsPlaying(true);
        play();
        fadeIn();
      }
    });
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
