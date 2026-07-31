import { create } from 'zustand';
import { useSettingsStore } from './settings';
import { splitHour12 } from '@/utils/trackName';

type Time = {
  hour: number;
  minute: number;
  ampm: string;
  month: string;
  dayNb: number;
  day: string;
  ready: boolean;
  updateTime: () => void;
};

const MINUTES_PER_DAY = 24 * 60;

const SEED = {
  hour: 12,
  minute: 0,
  ampm: 'AM',
  month: 'Jan',
  dayNb: 1,
  day: 'Mon',
};

export const useTimeStore = create<Time>((set) => ({
  ...SEED,
  ready: false,
  updateTime: () => {
    const offset = useSettingsStore.getState().time;
    const now = new Date();

    const totalMinutes =
      now.getHours() * 60 + now.getMinutes() + offset.hour * 60 + offset.minute;
    const normalized =
      ((totalMinutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;

    const { hour12, ampm } = splitHour12(Math.floor(normalized / 60));

    set({
      hour: hour12,
      minute: normalized % 60,
      ampm,
      month: now.toLocaleDateString('en-US', { month: 'short' }),
      dayNb: now.getDate(),
      day: now.toLocaleDateString('en-US', { weekday: 'short' }),
      ready: true,
    });
  },
}));
