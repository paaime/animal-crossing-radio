export interface IChatEmote {
  id: string;
  name: string;
}

export interface IEmoteFlight {
  key: string;
  userId: string;
  emote: IChatEmote;
  direction: 1 | -1;
  topPercent: number;
  travelVw: number;
  driftVh: number[];
  driftTimes: number[];
  sizePx: number;
  durationS: number;
  delayS: number;
  bobPx: number;
  bobPeriodS: number;
  tiltDeg: number;
  swayPeriodS: number;
}
