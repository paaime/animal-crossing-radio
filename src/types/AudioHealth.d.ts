export interface IAudioLogEntry {
  at: number;
  event: string;
  track: string;
  currentTime: number;
  duration: number;
  paused: boolean;
  volume: number;
  readyState: number;
  networkState: number;
  errorCode: number | null;
  detail: string | null;
}

export interface IAudioMonitorOptions {
  element: HTMLAudioElement;
  /**
   * Optional hook called once each time playback is found to be stalled.
   * Left unset the monitor only observes and records — it never touches
   * playback itself.
   */
  onStall?: (reason: string, log: readonly IAudioLogEntry[]) => void;
}

export interface IAudioMonitor {
  start: () => void;
  stop: () => void;
}
