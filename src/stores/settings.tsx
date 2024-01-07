import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Settings = {
  volume: number;
  game: string;
  setVolume: (volume: number) => void;
  setGame: (game: string) => void;
};

export const useSettingsStore = create(
  persist<Settings>(
    (set) => ({
      volume: 50,
      game: 'New Leaf',
      setVolume: (volume: number) => set({ volume }),
      setGame: (game: string) => set({ game }),
    }),
    {
      name: 'settings',
    }
  )
);
