import { albums } from '@/data/albums';
import { IMusic } from '@/types/Music';
import { RAIN_SUFFIX, SNOW_SUFFIX } from './trackName';

export const LIVE_WEATHER_CHANCE = 0.2;

export function getWeatherVariants(album: string, trackName: string): string[] {
  const sounds = albums.find((a) => a.name === album)?.sounds ?? [];
  return [RAIN_SUFFIX, SNOW_SUFFIX]
    .map((suffix) => `${trackName}${suffix}`)
    .filter((variant) => sounds.some((sound) => sound.name === variant));
}

export function withRandomWeather<T extends IMusic>(
  music: T,
  random: () => number = Math.random
): T {
  const variants = getWeatherVariants(music.album, music.name);
  if (variants.length === 0 || random() >= LIVE_WEATHER_CHANCE) return music;

  return { ...music, name: variants[Math.floor(random() * variants.length)] };
}
