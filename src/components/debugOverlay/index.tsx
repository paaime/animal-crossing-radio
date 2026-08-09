'use client';

import { useEffect, useState } from 'react';
import { formatAudioLog, getPreviousAudioLog } from '@/utils/audioEventLog';

type OverlayView = 'hidden' | 'current' | 'previous';

const NEXT_VIEW: Record<OverlayView, OverlayView> = {
  hidden: 'current',
  current: 'previous',
  previous: 'hidden',
};

const TOGGLE_KEY = 'd';
const REFRESH_MS = 1_000;

const isTypingTarget = (target: EventTarget | null): boolean => {
  const element = target as HTMLElement | null;
  if (!element) return false;
  return (
    element.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)
  );
};

export default function DebugOverlay() {
  const [view, setView] = useState<OverlayView>('hidden');
  const [text, setText] = useState('');

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== TOGGLE_KEY) return;
      if (isTypingTarget(event.target)) return;
      setView((current) => NEXT_VIEW[current]);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (view === 'hidden') return;

    const refresh = () =>
      setText(
        view === 'previous'
          ? formatAudioLog(getPreviousAudioLog())
          : formatAudioLog(),
      );

    refresh();
    const intervalId = setInterval(refresh, REFRESH_MS);
    return () => clearInterval(intervalId);
  }, [view]);

  if (view === 'hidden') return null;

  return (
    <div className="fixed inset-4 z-50 flex flex-col rounded-2xl bg-black/90 text-white">
      <div className="flex items-baseline justify-between px-5 py-3 border-b border-white/15">
        <h2 className="text-lg font-semibold tracking-tight">
          Audio log — {view === 'previous' ? 'previous run' : 'this run'}
        </h2>
        <span className="text-xs font-light text-white/60">
          press D to {view === 'current' ? 'see the previous run' : 'close'}
        </span>
      </div>
      <pre className="flex-1 overflow-auto px-5 py-3 text-[11px] leading-[1.45] font-mono whitespace-pre">
        {text}
      </pre>
    </div>
  );
}
