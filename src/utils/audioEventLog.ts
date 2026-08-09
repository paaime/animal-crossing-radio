import { IAudioLogEntry } from '@/types/AudioHealth';

const LOG_LIMIT = 80;
const STORAGE_KEY = 'radio:audio-log';
const PREVIOUS_STORAGE_KEY = 'radio:audio-log:previous';

let entries: readonly IAudioLogEntry[] = [];

type WindowWithLog = Window &
  typeof globalThis & {
    radioAudioLog?: () => readonly IAudioLogEntry[];
    radioPreviousAudioLog?: () => readonly IAudioLogEntry[];
    radioPrintAudioLog?: () => void;
  };

/** Human-readable track name from the element's resolved source URL. */
const trackFromSrc = (src: string): string => {
  if (!src) return '(no source)';
  try {
    return decodeURIComponent(new URL(src, window.location.href).pathname);
  } catch {
    return src;
  }
};

const readStoredLog = (key: string): readonly IAudioLogEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as IAudioLogEntry[]) : [];
  } catch (error) {
    console.error('[radio] could not read the stored audio log', error);
    return [];
  }
};

const write = (key: string, log: readonly IAudioLogEntry[]): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(log));
  } catch (error) {
    console.error('[radio] could not persist the audio log', error);
  }
};

/** Freeze the element's current state into a log entry, without storing it. */
export const snapshotAudio = (
  element: HTMLAudioElement,
  event: string,
  detail: string | null = null,
): IAudioLogEntry => ({
  at: Date.now(),
  event,
  track: trackFromSrc(element.currentSrc || element.src),
  currentTime: element.currentTime,
  duration: element.duration,
  paused: element.paused,
  volume: element.volume,
  readyState: element.readyState,
  networkState: element.networkState,
  errorCode: element.error ? element.error.code : null,
  detail,
});

export const logAudioEvent = (
  element: HTMLAudioElement,
  event: string,
  detail: string | null = null,
): IAudioLogEntry => {
  const entry = snapshotAudio(element, event, detail);
  entries = [...entries, entry].slice(-LOG_LIMIT);
  write(STORAGE_KEY, entries);
  return entry;
};

export const logPageEvent = (event: string, detail: string): void => {
  const entry: IAudioLogEntry = {
    at: Date.now(),
    event,
    track: '(page)',
    currentTime: NaN,
    duration: NaN,
    paused: false,
    volume: NaN,
    readyState: -1,
    networkState: -1,
    errorCode: null,
    detail,
  };
  entries = [...entries, entry].slice(-LOG_LIMIT);
  write(STORAGE_KEY, entries);
};

export const getAudioLog = (): readonly IAudioLogEntry[] => entries;

export const getPreviousAudioLog = (): readonly IAudioLogEntry[] =>
  readStoredLog(PREVIOUS_STORAGE_KEY);

const asFixed = (value: number, digits: number): string =>
  Number.isFinite(value) ? value.toFixed(digits) : '—';

const formatEntry = (entry: IAudioLogEntry): string => {
  const time = new Date(entry.at).toISOString().slice(11, 19);
  const position = `${asFixed(entry.currentTime, 1)}/${asFixed(
    entry.duration,
    1,
  )}`;
  const state =
    entry.readyState < 0
      ? ''
      : [
          entry.paused ? 'paused' : 'playing',
          `ready=${entry.readyState}`,
          `net=${entry.networkState}`,
          `vol=${asFixed(entry.volume, 2)}`,
          entry.errorCode !== null ? `errCode=${entry.errorCode}` : null,
        ]
          .filter(Boolean)
          .join(' ');

  return [
    time,
    entry.event.padEnd(16),
    position.padEnd(13),
    state.padEnd(46),
    entry.track,
    entry.detail ? `— ${entry.detail}` : '',
  ]
    .join(' ')
    .trimEnd();
};

export const formatAudioLog = (
  log: readonly IAudioLogEntry[] = entries,
): string => (log.length === 0 ? '(empty)' : log.map(formatEntry).join('\n'));

export const dumpAudioLog = (reason: string): void => {
  console.warn(`[radio] audio log — ${reason}\n${formatAudioLog()}`);
};

/**
 * Roll the stored log aside so the run that just ended stays readable, and
 * expose both runs on `window` for a DevTools console attached to the OBS
 * browser source:
 *
 *   radioPrintAudioLog()      // this run, formatted
 *   radioAudioLog()           // this run, raw entries
 *   radioPreviousAudioLog()   // the run before the last reload
 */
export const initAudioLog = (): void => {
  if (typeof window === 'undefined') return;

  const lastRun = readStoredLog(STORAGE_KEY);
  if (lastRun.length > 0) {
    write(PREVIOUS_STORAGE_KEY, lastRun);
    console.warn(
      `[radio] audio log from the previous run\n${formatAudioLog(lastRun)}`,
    );
  }

  entries = [];
  write(STORAGE_KEY, entries);

  const target = window as WindowWithLog;
  target.radioAudioLog = getAudioLog;
  target.radioPreviousAudioLog = getPreviousAudioLog;
  target.radioPrintAudioLog = () => dumpAudioLog('manual dump');
};
