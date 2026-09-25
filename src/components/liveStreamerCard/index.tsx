'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import TwitchIcon from '../icons/TwitchIcon';
import { parseTwitchLogin } from '@/utils/twitchChannel';

const ROTATE_MS = 20_000;

const supportStreamers: string[] = ['MaddySaReina', 'P0mmeVanille'];

const streamers = supportStreamers
  .map(parseTwitchLogin)
  .filter((login): login is string => login !== null);

export default function LiveStreamerCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (streamers.length < 2) return;

    const intervalId = setInterval(
      () => setIndex((current) => (current + 1) % streamers.length),
      ROTATE_MS,
    );
    return () => clearInterval(intervalId);
  }, []);

  if (streamers.length === 0) return null;

  const login = streamers[index];

  return (
    <motion.div
      className="absolute top-10 left-10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-3 bg-black/55 px-5 py-3 rounded-xl items-center">
        <div className="flex items-center justify-center w-[44px] h-[44px] rounded-lg bg-twitch [&>svg]:w-6 [&>svg]:h-6">
          <TwitchIcon />
        </div>
        <div className="flex flex-col text-white min-w-[160px]">
          <p className="text-xs font-light uppercase tracking-wider text-white/70">
            Thanks to
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-semibold text-xl whitespace-nowrap">
                {login}
              </p>
              <p className="text-base font-light">
                twitch.tv/{login.toLowerCase()}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
