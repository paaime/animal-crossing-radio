'use client';

import Volume from './components/Volume';
import Games from './components/Games';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Backgrounds from './components/Backgrounds';
import Time from './components/Time';
import About from '../about';

export default function Settings({
  setSettingsOpen,
}: {
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const audio = new Audio('/sounds/click.mp3');
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState({
    volume: false,
    games: false,
    backgrounds: false,
    time: false,
    about: false,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setSettingsOpen]);

  return (
    <div
      className="absolute bottom-[30px] max-w-full z-30 w-[340px] h-[200px] font-seurat flex items-center justify-center"
      ref={ref}
    >
      {open.volume && <Volume />}
      {open.games && <Games />}
      {open.backgrounds && <Backgrounds />}
      {open.time && <Time />}
      {open.about && <About />}
      <span
        className="absolute top-[-15px] left-2 before:block before:absolute before:-inset-1 before:bg-[#dd8530] before:rounded-full inline-block w-fit z-20  text-md tracking-wide"
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
        height="220"
        viewBox="0 0 739 525"
        fill="none"
        className="w-full absolute settings-svg"
        style={{
          animation:
            'blob 1.5s cubic-bezier(0.37, 0, 0.63, 1) 0.3s infinite alternate',
        }}
      >
        <path
          d="M658.95 27.2894C525.341 -10.2604 214.196 -7.91365 75.0963 27.2894C-32.8892 93.0023 -0.859615 259.631 27.5094 337.078C27.5094 381.669 15.6127 475.544 53.1331 494.319C75.0963 529.522 460.672 535.78 658.95 506.053C722.643 500.421 714.773 402.791 709.282 337.078C779.748 154.021 709.282 41.4349 658.95 27.2894Z"
          fill="#FFFBE7"
        />
      </svg>
      <div className="flex flex-col gap-[3.5px] z-20 text-[#74664B] font-seurat font-bold w-3/6 text-lg mt-[10px]">
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
              time: false,
              about: false,
            });
          }}
        >
          <span className="relative">Backgrounds</span>
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
              time: false,
              about: !open.about,
            });
          }}
        >
          <span className="relative">About</span>
        </span>
      </div>
    </div>
  );
}
