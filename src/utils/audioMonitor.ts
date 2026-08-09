import { IAudioMonitor, IAudioMonitorOptions } from '@/types/AudioHealth';
import { getAudioLog, logAudioEvent, logPageEvent } from './audioEventLog';

/** How often we sample the element's playback position. */
const TICK_MS = 500;
/**
 * How long playback may make no progress before we call it stalled. The player
 * only ever advances on the `ended` event, so a frozen `currentTime` while the
 * element is not paused is exactly the freeze we are chasing.
 */
const STALL_LIMIT_MS = 5_000;


const WATCHED_EVENTS = [
  'loadstart',
  'loadeddata',
  'play',
  'playing',
  'pause',
  'waiting',
  'stalled',
  'suspend',
  'abort',
  'emptied',
  'ended',
  'error',
] as const;

const PROGRESS_RESETTING_EVENTS = new Set([
  'loadstart',
  'emptied',
  'play',
  'playing',
  'ended',
]);

const MEDIA_ERROR_NAMES: Record<number, string> = {
  1: 'MEDIA_ERR_ABORTED',
  2: 'MEDIA_ERR_NETWORK',
  3: 'MEDIA_ERR_DECODE',
  4: 'MEDIA_ERR_SRC_NOT_SUPPORTED',
};

const describeMediaError = (element: HTMLAudioElement): string | null => {
  const { error } = element;
  if (!error) return null;
  const name = MEDIA_ERROR_NAMES[error.code] ?? `code ${error.code}`;
  return error.message ? `${name}: ${error.message}` : name;
};

/**
 * Watches the audio element and writes everything it sees to the audio log:
 * media events, media errors, page errors, unhandled promise rejections (this
 * is where a rejected `play()` shows up), and the moment playback stops making
 * progress.
 *
 * It only observes. Recovery is the caller's business, via `onStall`.
 */
export const createAudioMonitor = ({
  element,
  onStall,
}: IAudioMonitorOptions): IAudioMonitor => {
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let lastPosition = element.currentTime;
  let lastProgressAt = Date.now();
  let stallReportedAt: number | null = null;

  const markProgress = () => {
    lastPosition = element.currentTime;
    lastProgressAt = Date.now();
  };

  const handleMediaEvent = (event: Event) => {
    logAudioEvent(
      element,
      event.type,
      event.type === 'error' ? describeMediaError(element) : null
    );
    if (PROGRESS_RESETTING_EVENTS.has(event.type)) markProgress();
  };

  const handlePageError = (event: ErrorEvent) => {
    logPageEvent(
      'page-error',
      `${event.message} (${event.filename}:${event.lineno})`
    );
  };

  /** A rejected `play()` lands here — the most likely silent stream killer. */
  const handleRejection = (event: PromiseRejectionEvent) => {
    const reason: unknown = event.reason;
    const detail =
      reason instanceof Error
        ? `${reason.name}: ${reason.message}`
        : String(reason);
    logPageEvent('unhandled-rejection', detail);
  };

  const tick = () => {
    if (element.paused) {
      markProgress();
      return;
    }

    if (element.currentTime !== lastPosition) {
      if (stallReportedAt !== null) {
        const stalledForMs = Date.now() - stallReportedAt;
        logAudioEvent(
          element,
          'stall-recovered',
          `playback resumed after ${Math.round(stalledForMs / 1000)}s`
        );
        stallReportedAt = null;
      }
      markProgress();
      return;
    }

    // Already reported; keep quiet until it either recovers or the page dies.
    if (stallReportedAt !== null) return;

    const stalledForMs = Date.now() - lastProgressAt;
    if (stalledForMs < STALL_LIMIT_MS) return;

    stallReportedAt = Date.now();
    const reason = `no playback progress for ${Math.round(
      stalledForMs / 1000
    )}s while unpaused`;
    logAudioEvent(element, 'stall-detected', reason);
    console.warn(`[radio] ${reason}`);
    onStall?.(reason, getAudioLog());
  };

  return {
    start: () => {
      if (intervalId !== null) return;
      WATCHED_EVENTS.forEach((name) =>
        element.addEventListener(name, handleMediaEvent)
      );
      window.addEventListener('error', handlePageError);
      window.addEventListener('unhandledrejection', handleRejection);
      markProgress();
      intervalId = setInterval(tick, TICK_MS);
    },

    stop: () => {
      WATCHED_EVENTS.forEach((name) =>
        element.removeEventListener(name, handleMediaEvent)
      );
      window.removeEventListener('error', handlePageError);
      window.removeEventListener('unhandledrejection', handleRejection);
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
  };
};
