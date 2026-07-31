'use client';

import { useEffect, useState } from 'react';
import { soundUrl } from '@/utils/hourly';

const PlayGlyph = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
    <path
      d="M0 1.2C0 .3.9-.3 1.7.2l7 4.8c.7.5.7 1.5 0 2l-7 4.8c-.8.5-1.7-.1-1.7-1V1.2Z"
      fill="currentColor"
    />
  </svg>
);

const PauseGlyph = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
    <rect width="3.5" height="12" rx="1.5" fill="currentColor" />
    <rect x="6.5" width="3.5" height="12" rx="1.5" fill="currentColor" />
  </svg>
);

let sharedAudio: HTMLAudioElement | null = null;
const listeners = new Set<(url: string | null) => void>();

const broadcast = (url: string | null) =>
  listeners.forEach((notify) => notify(url));

function playTrack(url: string) {
  if (!sharedAudio) {
    sharedAudio = new Audio();
    sharedAudio.addEventListener('ended', () => broadcast(null));
    sharedAudio.addEventListener('pause', () => {
      if (sharedAudio?.ended) broadcast(null);
    });
    sharedAudio.addEventListener('error', () => broadcast(null));
  }

  sharedAudio.src = url;
  void sharedAudio.play().then(
    () => broadcast(url),
    () => broadcast(null),
  );
}

function stopTrack() {
  sharedAudio?.pause();
  broadcast(null);
}

function releaseAudio() {
  if (!sharedAudio) return;

  sharedAudio.pause();
  // Drop the buffer too: a detached element holding a decoded mp3 would
  // otherwise stay alive as long as the module does.
  sharedAudio.removeAttribute('src');
  sharedAudio.load();
  sharedAudio = null;
}

export default function PlayCell({
  album,
  track,
  label,
}: {
  album: string;
  track: string;
  label: string;
}) {
  const url = soundUrl(album, track);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const notify = (activeUrl: string | null) =>
      setIsPlaying(activeUrl === url);

    listeners.add(notify);
    return () => {
      listeners.delete(notify);

      // Last cell unmounting means the tracklist is gone from the page.
      if (listeners.size === 0) releaseAudio();
    };
  }, [url]);

  return (
    <button
      type="button"
      aria-label={isPlaying ? `Stop ${label}` : `Play ${label} from ${album}`}
      onClick={() => (isPlaying ? stopTrack() : playTrack(url))}
      className={`custom-pointer inline-flex h-8 w-8 items-center justify-center rounded-full transition ${
        isPlaying
          ? 'bg-[#E2826A] text-white'
          : 'bg-white/80 text-[#775B46] hover:bg-white'
      }`}
    >
      {isPlaying ? <PauseGlyph /> : <PlayGlyph />}
    </button>
  );
}
