export const RAIN_SUFFIX = ' 🌧️';
export const SNOW_SUFFIX = ' ❄️';

export interface IHour12 {
  hour12: number;
  ampm: 'AM' | 'PM';
}

/** The single definition of how a 24-hour clock maps to the 12-hour labels. */
export function splitHour12(hour24: number): IHour12 {
  return {
    hour12: hour24 % 12 === 0 ? 12 : hour24 % 12,
    ampm: hour24 >= 12 ? 'PM' : 'AM',
  };
}

/** '12 AM' … '11 PM' — also the clear-weather track name for that hour. */
export function hourLabel(hour24: number): string {
  const { hour12, ampm } = splitHour12(hour24);
  return `${hour12} ${ampm}`;
}

export const soundUrl = (album: string, track: string) =>
  `/sounds/${encodeURIComponent(album)}/${encodeURIComponent(track)}.mp3`;

/** True when a track name is a rain or snow arrangement rather than the clear version. */
export const isWeatherVariant = (trackName: string) =>
  trackName.includes(RAIN_SUFFIX.trim()) ||
  trackName.includes(SNOW_SUFFIX.trim());
