import {
  IViewport,
  IWeatherParticle,
  TrackWeather,
  WeatherKind,
} from '@/types/Weather';

type Random = () => number;
type Range = readonly [number, number];

interface IKindConfig {
  perMegapixel: number;
  speedPxPerS: Range;
  driftPxPerS: Range;
  size: Range;
  opacity: Range;
  swayPx: Range;
  swayPeriodS: Range;
  fadeInS: number;
  fillS: number;
  spawnOnScreen: boolean;
}

const REFERENCE_HEIGHT_PX = 1080;
const MEGAPIXEL = 1_000_000;
const FADE_OUT_S = 2.5;
const RAIN_SPAWN_BAND = 0.1;

// Ranges are lerped by one depth value, so near particles are bigger, faster and brighter.
const KIND_CONFIG: Record<WeatherKind, IKindConfig> = {
  rain: {
    perMegapixel: 55,
    speedPxPerS: [1100, 1700],
    driftPxPerS: [150, 230],
    size: [10, 22],
    opacity: [0.08, 0.25],
    swayPx: [0, 0],
    swayPeriodS: [1, 1],
    fadeInS: 0.15,
    fillS: 0.4,
    spawnOnScreen: false,
  },
  snow: {
    perMegapixel: 45,
    speedPxPerS: [35, 95],
    driftPxPerS: [10, 30],
    size: [1, 3],
    opacity: [0.25, 0.6],
    swayPx: [8, 28],
    swayPeriodS: [3, 7],
    fadeInS: 1.5,
    fillS: 3,
    spawnOnScreen: true,
  },
};

const lerp = ([min, max]: Range, t: number): number => min + (max - min) * t;

const between = (random: Random, min: number, max: number): number =>
  min + random() * (max - min);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const targetParticleCount = (
  kind: WeatherKind,
  { width, height }: IViewport,
): number =>
  Math.round(((width * height) / MEGAPIXEL) * KIND_CONFIG[kind].perMegapixel);

export function spawnParticle(
  kind: WeatherKind,
  viewport: IViewport,
  random: Random = Math.random,
): IWeatherParticle {
  const config = KIND_CONFIG[kind];
  const scale = viewport.height / REFERENCE_HEIGHT_PX;
  const depth = random();
  const size = lerp(config.size, depth) * scale;
  const vy = lerp(config.speedPxPerS, depth) * scale;
  const vx = lerp(config.driftPxPerS, depth) * scale;
  const crossingPx = (vx / vy) * viewport.height;
  const y = config.spawnOnScreen
    ? between(random, -size, viewport.height)
    : between(random, -viewport.height * RAIN_SPAWN_BAND, 0) - size;

  return {
    kind,
    x: between(random, -crossingPx, viewport.width),
    y,
    vx,
    vy,
    size,
    opacity: lerp(config.opacity, depth),
    fade: 0,
    swayPx: lerp(config.swayPx, random()) * scale,
    swayRadPerS: (2 * Math.PI) / lerp(config.swayPeriodS, random()),
    phase: random() * 2 * Math.PI,
  };
}

const stepParticle = (
  particle: IWeatherParticle,
  dtS: number,
  isActive: boolean,
): IWeatherParticle => {
  const fadeRate = isActive
    ? 1 / KIND_CONFIG[particle.kind].fadeInS
    : -1 / FADE_OUT_S;
  return {
    ...particle,
    x: particle.x + particle.vx * dtS,
    y: particle.y + particle.vy * dtS,
    phase: particle.phase + particle.swayRadPerS * dtS,
    fade: clamp(particle.fade + fadeRate * dtS, 0, 1),
  };
};

const isInView = (
  particle: IWeatherParticle,
  { width, height }: IViewport,
): boolean =>
  particle.y - particle.size <= height &&
  particle.x >= -width / 2 &&
  particle.x <= width * 1.5;

export function stepWeather(
  particles: readonly IWeatherParticle[],
  weather: TrackWeather,
  dtS: number,
  viewport: IViewport,
  random: Random = Math.random,
): readonly IWeatherParticle[] {
  const moved = particles
    .map((particle) => stepParticle(particle, dtS, particle.kind === weather))
    .filter(
      (particle) =>
        isInView(particle, viewport) &&
        (particle.kind === weather || particle.fade > 0),
    );
  if (weather === 'clear') return moved;

  const target = targetParticleCount(weather, viewport);
  const missing =
    target - moved.filter((particle) => particle.kind === weather).length;
  const budget = Math.ceil((target * dtS) / KIND_CONFIG[weather].fillS);
  const spawnCount = clamp(Math.min(missing, budget), 0, target);
  if (spawnCount === 0) return moved;

  return [
    ...moved,
    ...Array.from({ length: spawnCount }, () =>
      spawnParticle(weather, viewport, random),
    ),
  ];
}
