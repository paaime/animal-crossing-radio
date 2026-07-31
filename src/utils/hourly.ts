import { albums } from '@/data/albums';
import { hourlyGames, IHourlyGame } from '@/data/hourlyGames';
import type { ISound } from '@/types/Album';
import { RAIN_SUFFIX, SNOW_SUFFIX, hourLabel } from './trackName';

export { RAIN_SUFFIX, SNOW_SUFFIX, hourLabel, soundUrl } from './trackName';

export interface IHourlyRow {
  hour: number;
  /** '12 AM' … '11 PM' — also the clear-weather track name. */
  label: string;
  clear?: ISound;
  rain?: ISound;
  snow?: ISound;
}

export const getGameBySlug = (slug: string): IHourlyGame | undefined =>
  hourlyGames.find((game) => game.slug === slug);

/**
 * Builds the 24 hourly rows for an album, in chronological order.
 *
 * Looks tracks up by name rather than by array index: albums.ts stores them as
 * 1 AM … 11 PM followed by 12 AM (midnight last), and mixes ~40-90 non-hourly
 * tracks into the same array.
 */
export function getHourlyRows(albumName: string): IHourlyRow[] {
  const album = albums.find((entry) => entry.name === albumName);
  if (!album) return [];

  const byName = new Map(album.sounds.map((sound) => [sound.name, sound]));

  return Array.from({ length: 24 }, (_, hour) => {
    const label = hourLabel(hour);
    return {
      hour,
      label,
      clear: byName.get(label),
      rain: byName.get(label + RAIN_SUFFIX),
      snow: byName.get(label + SNOW_SUFFIX),
    };
  });
}

/**
 * albums.ts stores durations two ways: 'm:ss' for most tracks, and a bare
 * 'seconds.hundredths' float for short loops (e.g. Population Growing's
 * 3 AM is '20.06', i.e. 20 seconds).
 */
export function durationToSeconds(duration: string): number | null {
  const clock = /^(\d+):(\d{2})$/.exec(duration);
  if (clock) return Number(clock[1]) * 60 + Number(clock[2]);

  const seconds = /^(\d+)\.(\d{1,2})$/.exec(duration);
  if (seconds) return Math.round(Number(duration));

  return null;
}

export function formatDuration(duration: string): string {
  const total = durationToSeconds(duration);
  if (total === null) return duration;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

/** Total number of hourly tracks available for an album, across all weather. */
export function countHourlyTracks(rows: IHourlyRow[]): number {
  return rows.reduce(
    (total, row) =>
      total + (row.clear ? 1 : 0) + (row.rain ? 1 : 0) + (row.snow ? 1 : 0),
    0,
  );
}
