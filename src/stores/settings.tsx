import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Settings = {
  volume: number;
  game: string;
  background: string;
  time: { hour: number; minute: number };
  setVolume: (volume: number) => void;
  setGame: (game: string) => void;
  setBackground: (background: string) => void;
  setTime: (time: { hour: number; minute: number }) => void;
};

export const useSettingsStore = create(
  persist<Settings>(
    (set) => ({
      volume: 50,
      game: 'New Leaf',
      background: 'Celeste',
      time: {
        hour: 0,
        minute: 0,
      },
      setVolume: (volume: number) => set({ volume }),
      setGame: (game: string) => set({ game }),
      setBackground: (background: string) => set({ background }),
      setTime: (time: { hour: number; minute: number }) => set({ time }),
    }),
    {
      name: 'settings',
    }
  )
);
