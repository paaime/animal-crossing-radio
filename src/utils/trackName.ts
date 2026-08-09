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

const PATH_SAFE_ESCAPES: Record<string, string> = {
  '%24': '$',
  '%26': '&',
  '%2B': '+',
  '%2C': ',',
  '%3A': ':',
  '%3B': ';',
  '%3D': '=',
  '%40': '@',
};

const encodePathSegment = (segment: string): string =>
  encodeURIComponent(segment).replace(
    /%(?:24|26|2B|2C|3A|3B|3D|40)/g,
    (escape) => PATH_SAFE_ESCAPES[escape],
  );

export const soundUrl = (album: string, track: string) =>
  `/sounds/${encodePathSegment(album)}/${encodePathSegment(track)}.mp3`;

/** True when a track name is a rain or snow arrangement rather than the clear version. */
export const isWeatherVariant = (trackName: string) =>
  trackName.includes(RAIN_SUFFIX.trim()) ||
  trackName.includes(SNOW_SUFFIX.trim());
