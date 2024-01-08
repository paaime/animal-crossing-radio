'use client';

import Volume from './components/Volume';
import Games from './components/Games';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

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
  }, [ref]);

  return (
    <div
      className="absolute bottom-[50px] max-w-full z-30 w-[400px] h-[150px] font-roboto flex items-center justify-center"
      ref={ref}
    >
      {open.volume && <Volume />}
      {open.games && <Games />}
      <span className="absolute top-[-10px] left-5 before:block before:absolute before:-inset-1 -rotate-[8deg] before:bg-[#E2826A] before:rounded-full inline-block w-fit z-20  text-md tracking-wide">
        <span className="relative px-3 text-xl rotate-[0.022deg] font-medium">
          Settings
        </span>
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="740"
        height="150"
        viewBox="0 0 740 326"
        fill="none"
        className="w-full absolute"
      >
        <path
          d="M658.963 17.0141C525.351 -6.26029 214.2 -4.80572 75.0977 17.0141C-32.8898 57.7446 -0.859632 161.025 27.51 209.029C27.51 236.667 15.613 294.854 53.1341 306.491C75.0977 328.311 460.68 332.19 658.963 313.764C722.657 310.273 714.787 249.759 709.296 209.029C779.762 95.5657 709.296 25.7818 658.963 17.0141Z"
          fill="#FFFBE7"
        />
      </svg>
      <div className="flex flex-col gap-2 z-20 text-[#725D42] font-medium w-3/6 text-lg">
        <span
          className={`hover:before:block before:${
            open.volume ? 'block' : 'hidden'
          } before:absolute before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit`}
          onClick={() => {
            audio.play();
            setOpen({
              volume: !open.volume,
              games: false,
            });
          }}
        >
          <span className="relative">Volume</span>
        </span>
        <span
          className={`hover:before:block before:${
            open.games ? 'block' : 'hidden'
          } before:absolute before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit`}
          onClick={() => {
            audio.play();
            setOpen({
              volume: false,
              games: !open.games,
            });
          }}
        >
          <span className="relative">Change Game</span>
        </span>
        <span
          className="hover:before:block before:hidden before:absolute before:h-[10px] before:top-[13px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit"
          onClick={() => {
            setSettingsOpen(false);
            audio.play();
          }}
        >
          <span className="relative">Close</span>
        </span>
      </div>
    </div>
  );
}
