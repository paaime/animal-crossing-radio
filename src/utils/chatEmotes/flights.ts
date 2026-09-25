import { IChatEmote, IEmoteFlight } from '@/types/ChatEmote';

const MAX_PER_MESSAGE = 3;
const MAX_PER_USER = 6;
const MAX_ON_SCREEN = 30;

const BAND_MIN_PERCENT = 2;
const BAND_MAX_PERCENT = 88;

const LANE_JITTER_PERCENT = 3;

const DRIFT_TURNS = 3;
const DRIFT_STEP_MAX_VH = 14;
const DRIFT_TIME_JITTER = 0.35;

const SIZE_MIN_PX = 56;
const SIZE_MAX_PX = 88;

const TRAVEL_MIN_VW = 50;
const TRAVEL_MAX_VW = 85;

const SPEED_MIN_VW_PER_S = 12;
const SPEED_MAX_VW_PER_S = 18;

const STAGGER_S = 0.4;
const BOB_MIN_PX = 6;
const BOB_MAX_PX = 18;
const BOB_PERIOD_MIN_S = 1;
const BOB_PERIOD_MAX_S = 2;
const TILT_MIN_DEG = 4;
const TILT_MAX_DEG = 12;
const SWAY_PERIOD_MIN_S = 0.9;
const SWAY_PERIOD_MAX_S = 1.7;

type Random = () => number;

const between = (random: Random, min: number, max: number): number =>
  min + random() * (max - min);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

function planDrift(
  random: Random,
  laneTop: number,
): Pick<IEmoteFlight, 'driftVh' | 'driftTimes'> {
  const driftVh = Array.from({ length: DRIFT_TURNS }).reduce<number[]>(
    (path) => {
      const previous = path[path.length - 1];
      const next = clamp(
        laneTop +
          previous +
          between(random, -DRIFT_STEP_MAX_VH, DRIFT_STEP_MAX_VH),
        BAND_MIN_PERCENT,
        BAND_MAX_PERCENT,
      );
      return [...path, next - laneTop];
    },
    [0],
  );

  const lastIndex = driftVh.length - 1;
  // Jitter below half a segment keeps the times strictly increasing.
  const driftTimes = driftVh.map((_, index) =>
    index === 0 || index === lastIndex
      ? index / lastIndex
      : (index + between(random, -DRIFT_TIME_JITTER, DRIFT_TIME_JITTER)) /
        lastIndex,
  );

  return { driftVh, driftTimes };
}

interface AddEmoteFlightsArgs {
  current: readonly IEmoteFlight[];
  userId: string;
  emotes: readonly IChatEmote[];
  createKey: () => string;
  random?: Random;
}

export function addEmoteFlights({
  current,
  userId,
  emotes,
  createKey,
  random = Math.random,
}: AddEmoteFlightsArgs): readonly IEmoteFlight[] {
  const userCount = current.filter((flight) => flight.userId === userId).length;
  const room = Math.min(
    MAX_PER_MESSAGE,
    MAX_PER_USER - userCount,
    MAX_ON_SCREEN - current.length,
  );
  if (room <= 0 || emotes.length === 0) return current;

  // A message bursts from one side around one lane; from there each emote
  // follows its own path and speed, so the burst scatters as it crosses.
  const direction = random() < 0.5 ? 1 : -1;
  const laneTop = between(random, BAND_MIN_PERCENT, BAND_MAX_PERCENT);

  const launched = emotes.slice(0, room).map((emote, index): IEmoteFlight => {
    const topPercent = clamp(
      laneTop + between(random, -LANE_JITTER_PERCENT, LANE_JITTER_PERCENT),
      BAND_MIN_PERCENT,
      BAND_MAX_PERCENT,
    );
    const travelVw = between(random, TRAVEL_MIN_VW, TRAVEL_MAX_VW);
    return {
      key: createKey(),
      userId,
      emote,
      direction,
      topPercent,
      travelVw,
      ...planDrift(random, topPercent),
      sizePx: Math.round(between(random, SIZE_MIN_PX, SIZE_MAX_PX)),
      durationS:
        travelVw / between(random, SPEED_MIN_VW_PER_S, SPEED_MAX_VW_PER_S),
      delayS: index * STAGGER_S,
      bobPx: between(random, BOB_MIN_PX, BOB_MAX_PX),
      bobPeriodS: between(random, BOB_PERIOD_MIN_S, BOB_PERIOD_MAX_S),
      tiltDeg:
        between(random, TILT_MIN_DEG, TILT_MAX_DEG) *
        (random() < 0.5 ? 1 : -1),
      swayPeriodS: between(random, SWAY_PERIOD_MIN_S, SWAY_PERIOD_MAX_S),
    };
  });

  return [...current, ...launched];
}

export const removeEmoteFlight = (
  current: readonly IEmoteFlight[],
  key: string,
): readonly IEmoteFlight[] => current.filter((flight) => flight.key !== key);
