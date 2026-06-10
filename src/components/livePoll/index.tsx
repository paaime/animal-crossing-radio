'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { usePollStore } from '@/stores/poll';

function formatCountdown(msRemaining: number): string {
  const total = Math.max(0, Math.floor(msRemaining / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function LivePoll() {
  const isOpen = usePollStore((state) => state.isOpen);
  const candidates = usePollStore((state) => state.candidates);
  const votes = usePollStore((state) => state.votes);
  const endsAt = usePollStore((state) => state.endsAt);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const show = isOpen && candidates.length > 0;

  // Per-candidate counts derived from the vote map.
  const tally = candidates.map(
    (_, index) =>
      Object.values(votes).filter((choice) => choice === index).length,
  );
  const totalVotes = tally.reduce((sum, count) => sum + count, 0);
  const maxVotes = Math.max(0, ...tally);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute bottom-10 right-10 w-[380px] max-w-[calc(100vw-80px)] text-white"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="bg-black/55 rounded-2xl px-6 py-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Vote the next song
              </h2>
              {endsAt !== null && (
                <span className="text-lg font-light tabular-nums">
                  {formatCountdown(endsAt - now)}
                </span>
              )}
            </div>
            <p className="text-sm font-light text-white/80 mb-4">
              Type{' '}
              <span className="font-semibold text-white">
                1-{candidates.length}
              </span>{' '}
              in Twitch chat
            </p>

            <ul className="flex flex-col gap-2">
              {candidates.map((candidate, index) => {
                const count = tally[index];
                const isLeading = totalVotes > 0 && count === maxVotes;
                const fillPercent =
                  maxVotes > 0 ? Math.round((count / maxVotes) * 100) : 0;

                return (
                  <li
                    key={`${candidate.album}:${candidate.name}`}
                    className="relative overflow-hidden rounded-xl bg-white/10"
                  >
                    {/* Vote-share bar */}
                    <motion.div
                      className={`absolute inset-y-0 left-0 ${
                        isLeading ? 'bg-green-500/40' : 'bg-white/15'
                      }`}
                      initial={false}
                      animate={{ width: `${fillPercent}%` }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 30,
                      }}
                    />
                    <div className="relative flex items-center gap-3 px-3 py-2">
                      <span className="text-xl w-7 text-center shrink-0">
                        {index + 1}
                      </span>
                      <Image
                        src={`/img/artworks/${candidate.album}/512x512.png`}
                        alt={candidate.album}
                        width={44}
                        height={44}
                        className="rounded-lg w-11 h-11 shrink-0"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-semibold leading-tight truncate">
                          {candidate.name}
                        </span>
                        <span className="text-xs font-light text-white/70 truncate">
                          {candidate.album}
                        </span>
                      </div>
                      <span className="font-semibold tabular-nums shrink-0">
                        {count}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="text-xs font-light text-white/60 mt-3 text-right">
              {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
