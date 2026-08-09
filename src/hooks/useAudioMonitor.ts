import { RefObject, useEffect, useRef } from 'react';
import { createAudioMonitor } from '@/utils/audioMonitor';
import { initAudioLog } from '@/utils/audioEventLog';

interface UseAudioMonitorArgs {
  audioRef: RefObject<HTMLAudioElement>;
  enabled?: boolean;
  /**
   * Called once each time playback is found stalled. Omit it to only record —
   * which is what the live page does today, so the monitor cannot itself be
   * the cause of anything we then see in the log.
   */
  onStall?: (reason: string) => void;
}

export function useAudioMonitor({
  audioRef,
  enabled = true,
  onStall,
}: UseAudioMonitorArgs): void {
  const onStallRef = useRef(onStall);

  useEffect(() => {
    onStallRef.current = onStall;
  });

  useEffect(() => {
    if (!enabled) return;
    initAudioLog();
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const element = audioRef.current;
    if (!element) return;

    const monitor = createAudioMonitor({
      element,
      onStall: (reason) => onStallRef.current?.(reason),
    });

    monitor.start();
    return () => monitor.stop();
  }, [audioRef, enabled]);
}
