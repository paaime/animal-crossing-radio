export type WeatherKind = 'rain' | 'snow';

export type TrackWeather = 'clear' | WeatherKind;

export interface IViewport {
  width: number;
  height: number;
}

export interface IWeatherParticle {
  kind: WeatherKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  fade: number;
  swayPx: number;
  swayRadPerS: number;
  phase: number;
}
