'use client';

import { useCallback, useRef } from 'react';

const CLICK_SOUND_PATH = '/sounds/click.mp3';

export function useClickSound(src: string = CLICK_SOUND_PATH) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(src);
      }
      audioRef.current.currentTime = 0;
      // Autoplay policies reject until the user has interacted with the page.
      void audioRef.current.play().catch(() => {});
    } catch {
      // A missing or undecodable sound file must never break the interaction.
    }
  }, [src]);
}
