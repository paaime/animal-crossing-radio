import { create } from 'zustand';
import { useSettingsStore } from './settings';

type Time = {
  hour: number;
  minute: number;
  ampm: string;
  month: string;
  dayNb: number;
  day: string;
  updateTime: () => void;
};

let newHour = new Date().getHours() + useSettingsStore.getState().time.hour;
let newMinute =
  new Date().getMinutes() + useSettingsStore.getState().time.minute;

export const useTimeStore = create<Time>((set) => ({
  hour: newHour % 12 === 0 ? 12 : newHour % 12,
  minute: newMinute,
  ampm: newHour >= 12 ? 'PM' : 'AM',
  month: new Date().toLocaleDateString('en-US', { month: 'short' }),
  dayNb: new Date().getDate(),
  day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
  updateTime: () => {
    newHour = new Date().getHours() + useSettingsStore.getState().time.hour;
    newMinute =
      new Date().getMinutes() + useSettingsStore.getState().time.minute;
    if (newMinute >= 60) {
      newHour += 1;
      newMinute -= 60;
    }
    set({
      hour: newHour % 12 === 0 ? 12 : newHour % 12,
      minute: newMinute,
      ampm: newHour >= 12 ? 'PM' : 'AM',
      month: new Date().toLocaleDateString('en-US', { month: 'short' }),
      dayNb: new Date().getDate(),
      day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
    });
  },
  getMusicHour: () => {
    return newHour;
  },
}));
