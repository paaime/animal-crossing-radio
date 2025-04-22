import { useMusicStore } from '@/stores/music';
import { albums } from '@/data/albums';
import { NextMode } from '@/types/Enum';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '@/stores/settings';
import { useModalStore } from '@/stores/modal';

export default function RandomModePopup({
  changeMusic,
}: {
  changeMusic: () => void;
}) {
  const { randomPopupOpen, setRandomPopupOpen } = useModalStore();
  const { setNextMode, nextMode, setHourlyMode, setMusic, setHourlyMusic } =
    useMusicStore();
  const { excludedAlbums, setExcludedAlbums } = useSettingsStore();
  const ref = useRef<HTMLDivElement>(null); // Ref for click outside
  const [includeWeather, setIncludeWeather] = useState(
    nextMode === NextMode.RANDOM_ALBUM_WEATHER
  );
  const audio = new Audio('/sounds/click.mp3');

  const handleCheckbox = (album: string) => {
    if (excludedAlbums.includes(album)) {
      setExcludedAlbums(excludedAlbums.filter((a) => a !== album));
    } else {
      setExcludedAlbums([...excludedAlbums, album]);
    }
    audio.play();
  };

  useEffect(() => {
    setIncludeWeather(nextMode === NextMode.RANDOM_ALBUM_WEATHER);
  }, [nextMode]);

  const handleActivateToggle = () => {
    audio.play();
    if (
      nextMode === NextMode.RANDOM_ALBUM ||
      nextMode === NextMode.RANDOM_ALBUM_WEATHER
    ) {
      setNextMode(NextMode.NEXT);
      setHourlyMusic();
      changeMusic();
    } else {
      // Start random mode
      const randomAlbum = albums.filter(
        (album) => !excludedAlbums.includes(album.name)
      );

      const nextAlbum =
        randomAlbum[Math.floor(Math.random() * randomAlbum.length)];

      // Filter sounds based on weather setting
      let availableSounds = [...nextAlbum.sounds];

      if (!includeWeather) {
        const nonWeatherSounds = availableSounds.filter(
          (sound) => !sound.name.includes('🌧️') && !sound.name.includes('❄️')
        );

        if (nonWeatherSounds.length > 0) {
          availableSounds = nonWeatherSounds;
        }
      }

      const nextIndex = Math.floor(Math.random() * availableSounds.length);
      const nextMusic = availableSounds[nextIndex];

      // Find the original index in the album's sounds array
      const originalIndex = nextAlbum.sounds.findIndex(
        (sound) => sound.name === nextMusic.name
      );

      // Set the mode based on weather choice
      setNextMode(
        includeWeather ? NextMode.RANDOM_ALBUM_WEATHER : NextMode.RANDOM_ALBUM
      );
      setHourlyMode(false);
      setMusic({
        album: nextAlbum.name,
        name: nextMusic.name,
        index: originalIndex,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setRandomPopupOpen(false);
      }
    };
    if (randomPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [randomPopupOpen, setRandomPopupOpen]);

  const isRandomModeActive =
    nextMode === NextMode.RANDOM_ALBUM ||
    nextMode === NextMode.RANDOM_ALBUM_WEATHER;

  return (
    <AnimatePresence>
      {randomPopupOpen && (
        <motion.div
          ref={ref}
          className="absolute rounded-[30px] z-30 w-[385px] max-w-[calc(100vw-40px)] font-seurat flex flex-col items-center bg-[#F0F2E6] p-7 shadow-lg" // Keep main padding
          style={{ bottom: 'calc(50% - 208px)' }}
          initial={{ opacity: 0, transform: 'scale(0.95)' }}
          animate={{ opacity: 1, transform: 'scale(1)' }}
          exit={{ opacity: 0, transform: 'scale(0.95)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <span
            className="absolute top-[-15px] left-0 before:block before:absolute before:-inset-1 before:bg-[#E2826A] before:rounded-full inline-block w-fit z-20 text-md tracking-wide"
            style={{
              rotate: '-7deg',
              animation:
                'blob2 1.5s cubic-bezier(0.37, 0, 0.63, 1) 0.3s infinite alternate',
            }}
          >
            <span className="relative px-4 text-md text-white rotate-[0.022deg] font-medium">
              Random Mode Settings
            </span>
          </span>
          <div className="w-full flex flex-col items-center pt-2">
            <p className="text-sm text-gray-600 mb-4 px-2">
              Activate to play random music from all available games. Uncheck
              games below to exclude them.
            </p>
            <label
              className={`w-full flex bg-[#e9edda] text-[#775B46] py-2 px-4 font-bold rounded-full justify-between items-center cursor-pointer transition-colors duration-150 mb-3`} // Added margin-bottom
            >
              <span className="text-sm sm:text-sm select-none">
                Include Weather Variations
              </span>
              <input
                type="checkbox"
                className="appearance-none"
                checked={includeWeather}
                onChange={() => {
                  setIncludeWeather(!includeWeather);
                  setNextMode(
                    !includeWeather
                      ? NextMode.RANDOM_ALBUM_WEATHER
                      : NextMode.RANDOM_ALBUM
                  );
                  audio.play();
                }}
              />
              <div
                className={`w-4 h-4 rounded-full border-2 transition-colors duration-150 ${
                  includeWeather
                    ? 'bg-green-500 border-green-600'
                    : 'border-gray-400 bg-white'
                }`}
              ></div>
            </label>
            <div
              className="relative w-full max-h-52 overflow-y-auto mb-4 no-scrollbar" // Removed no-scrollbar, added padding-right
              style={
                {
                  '--scrollbar-width': '0px',
                  '--mask-height': '20px',
                  paddingBottom: 'var(--mask-height)',
                  maskImage: `linear-gradient(to bottom, transparent, black var(--mask-height), black calc(100% - var(--mask-height)), transparent), linear-gradient(black, black)`,
                  maskSize: `calc(100% - var(--scrollbar-width)) 100%, var(--scrollbar-width) 100%`,
                  maskPosition: `0 0, 100% 0`,
                  maskRepeat: `no-repeat, no-repeat`,
                } as React.CSSProperties
              }
            >
              <div className="space-y-2 px-1 pt-2">
                {albums.map((album) => {
                  const isIncluded = !excludedAlbums.includes(album.name);
                  return (
                    <label
                      key={album.name}
                      className={`flex bg-[#FDFFF3] text-[#775B46] py-2 px-4 font-bold rounded-full justify-between items-center cursor-pointer transition-colors duration-150 ${
                        isIncluded ? 'active' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span className="text-sm sm:text-sm select-none">
                        {album.name}
                      </span>
                      <input
                        type="checkbox"
                        className="appearance-none"
                        checked={isIncluded}
                        onChange={() => handleCheckbox(album.name)}
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-colors duration-150 ${
                          isIncluded
                            ? 'bg-green-500 border-green-600'
                            : 'border-gray-400 bg-white'
                        }`}
                      ></div>
                    </label>
                  );
                })}
              </div>
            </div>
            <button
              className={`w-full px-4 py-2 rounded-full font-bold text-white transition-colors duration-200 shadow-sm ${
                isRandomModeActive
                  ? 'bg-red-500 hover:bg-red-600 active:bg-red-700'
                  : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
              }`}
              onClick={handleActivateToggle}
            >
              {isRandomModeActive ? 'Stop' : 'Start'} Random Mode
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
