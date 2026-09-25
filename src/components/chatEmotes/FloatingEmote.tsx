'use client';

import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IEmoteFlight } from '@/types/ChatEmote';
import { getEmoteImageUrl } from '@/utils/chatEmotes/twitchEmotes';

const ENTRY_LEFT_VW = -10;
const ENTRY_RIGHT_VW = 102;

const OPACITY_KEYFRAMES = [0, 1, 1, 0];
const OPACITY_TIMES = [0, 0.08, 0.65, 1];

interface FloatingEmoteProps {
  flight: IEmoteFlight;
  onLand: (key: string) => void;
}

function FloatingEmote({ flight, onLand }: FloatingEmoteProps) {
  const { emote, topPercent, sizePx, durationS, delayS } = flight;
  const land = () => onLand(flight.key);
  const fromVw = flight.direction === 1 ? ENTRY_LEFT_VW : ENTRY_RIGHT_VW;
  const toVw = fromVw + flight.direction * flight.travelVw;
  const fromX = `${fromVw}vw`;
  const toX = `${toVw}vw`;

  return (
    <motion.div
      className="absolute left-0"
      style={{ top: `${topPercent}%` }}
      initial={{ x: fromX, y: '0vh', opacity: 0 }}
      animate={{
        x: toX,
        y: flight.driftVh.map((offset) => `${offset}vh`),
        opacity: OPACITY_KEYFRAMES,
      }}
      transition={{
        duration: durationS,
        delay: delayS,
        ease: 'linear',
        // Eased between turns, so the path curves instead of zig-zagging.
        y: {
          duration: durationS,
          delay: delayS,
          times: flight.driftTimes,
          ease: 'easeInOut',
        },
        opacity: {
          duration: durationS,
          delay: delayS,
          times: OPACITY_TIMES,
          ease: 'linear',
        },
      }}
      onAnimationComplete={land}
    >
      <motion.div
        initial={{ y: -flight.bobPx, rotate: -flight.tiltDeg }}
        animate={{ y: flight.bobPx, rotate: flight.tiltDeg }}
        // Bob and sway on different periods never line up into a fixed loop.
        transition={{
          y: {
            duration: flight.bobPeriodS,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          },
          rotate: {
            duration: flight.swayPeriodS,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          },
        }}
      >
        <Image
          src={getEmoteImageUrl(emote.id)}
          alt={emote.name || 'emote'}
          width={sizePx}
          height={sizePx}
          style={{ width: sizePx, height: sizePx }}
          className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)] select-none"
          loading="eager"
          draggable={false}
          unoptimized
          // A missing emote must not leave an invisible flight holding a slot.
          onError={land}
        />
      </motion.div>
    </motion.div>
  );
}

export default memo(FloatingEmote);
