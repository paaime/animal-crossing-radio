'use client';

import { useMusicStore } from '@/stores/music';
import { WeatherKind } from '@/types/Weather';
import { getTrackWeather } from '@/utils/trackName';
import { useWeatherCanvas } from './useWeatherCanvas';

const TINTS: Record<WeatherKind, string> = {
  rain: 'rgba(8, 16, 32, 0.18)',
  snow: 'rgba(210, 225, 245, 0.06)',
};

const TINT_KINDS = Object.keys(TINTS) as WeatherKind[];

export default function LiveWeather() {
  const trackName = useMusicStore((state) => state.music.name);
  const weather = getTrackWeather(trackName);
  const canvasRef = useWeatherCanvas(weather);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {TINT_KINDS.map((kind) => (
        <div
          key={kind}
          className="absolute inset-0 transition-opacity duration-[3000ms] ease-in-out"
          style={{
            backgroundColor: TINTS[kind],
            opacity: weather === kind ? 1 : 0,
          }}
        />
      ))}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
