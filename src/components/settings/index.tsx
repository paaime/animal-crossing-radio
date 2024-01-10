'use client';

import Volume from './components/Volume';
import Games from './components/Games';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Backgrounds from './components/Backgrounds';
import Time from './components/Time';

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
      className="absolute bottom-[30px] max-w-full z-30 w-[340px] h-[200px] font-roboto flex items-center justify-center"
      ref={ref}
    >
      {open.volume && <Volume />}
      {open.games && <Games />}
      {open.backgrounds && <Backgrounds />}
      {open.time && <Time />}
      <span
        className="absolute top-[-3px] left-2 before:block before:absolute before:-inset-1 before:bg-[#E2826A] before:rounded-full inline-block w-fit z-20  text-md tracking-wide"
        style={{
          rotate: '-8deg',
          animation:
            'blob2 1.5s cubic-bezier(0.37, 0, 0.63, 1) 0.3s infinite alternate',
        }}
      >
        <span className="relative px-4 text-xl rotate-[0.022deg] font-medium">
          Settings
        </span>
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="740"
        height="200"
        viewBox="0 0 740 473"
        fill="none"
        className="w-full absolute settings-svg"
        style={{
          animation:
            'blob 1.5s cubic-bezier(0.37, 0, 0.63, 1) 0.3s infinite alternate',
        }}
      >
        <path
          d="M658.963 25.2895C525.351 -8.46823 214.2 -6.35847 75.0977 25.2895C-32.8898 84.3661 -0.859632 234.167 27.51 303.793C27.51 343.88 15.613 428.275 53.1341 445.154C75.0977 476.802 460.68 482.428 658.963 455.703C722.657 450.64 714.787 362.869 709.296 303.793C779.762 139.223 709.296 38.0065 658.963 25.2895Z"
          fill="#FFFBE7"
        />
      </svg>
      <div className="flex flex-col gap-2 z-20 text-[#725D42] font-medium w-3/6 text-lg mt-[10px]">
        <span
          className={`hover:before:block before:${
            open.volume ? 'block' : 'hidden'
          } before:absolute before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit custom-pointer`}
          onClick={() => {
            audio.play();
            setOpen({
              volume: !open.volume,
              games: false,
              backgrounds: false,
              time: false,
            });
          }}
        >
          <span className="relative">Volume</span>
        </span>
        <span
          className={`hover:before:block before:${
            open.games ? 'block' : 'hidden'
          } before:absolute before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit custom-pointer`}
          onClick={() => {
            audio.play();
            setOpen({
              volume: false,
              games: !open.games,
              backgrounds: false,
              time: false,
            });
          }}
        >
          <span className="relative">Change Game</span>
        </span>
        <span
          className={`hover:before:block before:${
            open.backgrounds ? 'block' : 'hidden'
          } before:absolute before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit custom-pointer`}
          onClick={() => {
            audio.play();
            setOpen({
              volume: false,
              games: false,
              backgrounds: !open.backgrounds,
              time: false,
            });
          }}
        >
          <span className="relative">Backgrounds</span>
        </span>
        <span
          className={`hover:before:block before:${
            open.time ? 'block' : 'hidden'
          } before:absolute before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit custom-pointer`}
          onClick={() => {
            audio.play();
            setOpen({
              volume: false,
              games: false,
              backgrounds: false,
              time: !open.time,
            });
          }}
        >
          <span className="relative">Time</span>
        </span>
        {/* <span
          className="hover:before:block before:hidden before:absolute before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit"
          onClick={() => {
            setSettingsOpen(false);
            audio.play();
          }}
        >
          <span className="relative">Close</span>
        </span> */}
      </div>
    </div>
  );
}
