import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Settings = {
  volume: number;
  game: string;
  background: string;
  setVolume: (volume: number) => void;
  setGame: (game: string) => void;
  setBackground: (background: string) => void;
};

export const useSettingsStore = create(
  persist<Settings>(
    (set) => ({
      volume: 50,
      game: 'New Leaf',
      background: 'celeste',
      setVolume: (volume: number) => set({ volume }),
      setGame: (game: string) => set({ game }),
      setBackground: (background: string) => set({ background }),
    }),
    {
      name: 'settings',
    }
  )
);
