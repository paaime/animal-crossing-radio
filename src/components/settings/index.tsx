import Volume from './components/Volume';
import Games from './components/Games';
import { useEffect, useRef, useState } from 'react';
import Backgrounds from './components/Backgrounds';
import Time from './components/Time';
import About from '../about';
import Weather from './components/Weather';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalStore } from '@/stores/modal';

export default function Settings() {
  const { settingsOpen, setSettingsOpen } = useModalStore();
  const audio = new Audio('/sounds/click.mp3');
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState({
    volume: false,
    games: false,
    backgrounds: false,
    weather: false,
    time: false,
    about: false,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSettingsOpen(false);
        setOpen({
          volume: false,
          games: false,
          backgrounds: false,
          weather: false,
          time: false,
          about: false,
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setSettingsOpen]);

  return (
    <AnimatePresence>
      {settingsOpen && (
        <motion.div
          className="absolute bottom-[50px] max-w-full z-30 w-[340px] h-[200px] font-seurat flex items-center justify-center"
          ref={ref}
          initial={{ opacity: 0, transform: 'scale(0.95)' }}
          animate={{ opacity: 1, transform: 'scale(1)' }}
          exit={{ opacity: 0, transform: 'scale(0.95)' }}
        >
          <Volume open={open.volume} />
          <Games open={open.games} />
          <Backgrounds open={open.backgrounds} />
          <Weather open={open.weather} />
          <Time open={open.time} />
          <About open={open.about} />
          <span
            className="absolute top-[-28px] left-3 before:block before:absolute before:-inset-1 before:bg-[#dd8530] before:rounded-full inline-block w-fit z-20  text-md tracking-wide"
            style={{
              rotate: '-8deg',
              animation:
                'blob2 1.5s cubic-bezier(0.37, 0, 0.63, 1) 0.3s infinite alternate',
            }}
          >
            <span className="relative px-4 text-lg rotate-[0.022deg] font-medium text-white">
              Settings
            </span>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="739"
            height="250"
            viewBox="0 0 739 589"
            fill="none"
            className="w-full absolute settings-svg"
            style={{
              animation:
                'blob 1.5s cubic-bezier(0.37, 0, 0.63, 1) 0.3s infinite alternate',
            }}
          >
            <path
              d="M658.95 30.6162C525.341 -11.5112 214.196 -8.87836 75.0963 30.6162C-32.8892 104.34 -0.859615 291.281 27.5094 378.169C27.5094 428.196 15.6127 533.515 53.1332 554.579C75.0963 594.073 460.672 601.094 658.95 567.743C722.643 561.424 714.773 451.893 709.283 378.169C779.748 172.797 709.283 46.4861 658.95 30.6162Z"
              fill="#FFFBE7"
            />
          </svg>
          <div className="flex flex-col gap-[5px] z-20 text-[#74664B] font-seurat font-bold w-3/6 text-lg mt-[10px]">
            <span
              className={`hover:before:absolute before:${
                open.volume ? 'absolute' : 'hidden'
              } before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit custom-pointer`}
              onClick={() => {
                audio.play();
                setOpen({
                  volume: !open.volume,
                  games: false,
                  backgrounds: false,
                  weather: false,
                  time: false,
                  about: false,
                });
              }}
            >
              <span className="relative">Volume</span>
            </span>
            <span
              className={`hover:before:absolute before:${
                open.games ? 'absolute' : 'hidden'
              } before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit custom-pointer`}
              onClick={() => {
                audio.play();
                setOpen({
                  volume: false,
                  games: !open.games,
                  backgrounds: false,
                  weather: false,
                  time: false,
                  about: false,
                });
              }}
            >
              <span className="relative">Change Game</span>
            </span>
            <span
              className={`hover:before:absolute before:${
                open.backgrounds ? 'absolute' : 'hidden'
              } before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit custom-pointer`}
              onClick={() => {
                audio.play();
                setOpen({
                  volume: false,
                  games: false,
                  backgrounds: !open.backgrounds,
                  weather: false,
                  time: false,
                  about: false,
                });
              }}
            >
              <span className="relative">Backgrounds</span>
            </span>
            <span
              className={`hover:before:absolute before:${
                open.weather ? 'absolute' : 'hidden'
              }  before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit custom-pointer`}
              onClick={() => {
                audio.play();
                setOpen({
                  volume: false,
                  games: false,
                  backgrounds: false,
                  weather: !open.weather,
                  time: false,
                  about: false,
                });
              }}
            >
              <span className="relative">Weather</span>
            </span>
            <span
              className={`hover:before:absolute before:${
                open.time ? 'absolute' : 'hidden'
              }  before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit custom-pointer`}
              onClick={() => {
                audio.play();
                setOpen({
                  volume: false,
                  games: false,
                  backgrounds: false,
                  weather: false,
                  time: !open.time,
                  about: false,
                });
              }}
            >
              <span className="relative">Time</span>
            </span>
            <span
              className={`hover:before:absolute before:${
                open.about ? 'absolute' : 'hidden'
              }  before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit custom-pointer`}
              onClick={() => {
                audio.play();
                setOpen({
                  volume: false,
                  games: false,
                  backgrounds: false,
                  weather: false,
                  time: false,
                  about: !open.about,
                });
              }}
            >
              <span className="relative">About</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
