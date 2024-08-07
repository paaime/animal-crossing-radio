import { Weather } from '@/types/Enum';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Settings = {
  volume: number;
  game: string;
  background: string;
  time: { hour: number; minute: number };
  weather: Weather;
  showExtensionMessage: boolean;
  setVolume: (volume: number) => void;
  setGame: (game: string) => void;
  setBackground: (background: string) => void;
  setTime: (time: { hour: number; minute: number }) => void;
  setWeather: (weather: Weather) => void;
  getWeather: () => string;
  setShowExtensionMessage: (showExtensionMessage: boolean) => void;
};

export const useSettingsStore = create(
  persist<Settings>(
    (set, get) => ({
      volume: 50,
      game: 'New Leaf',
      background: 'Celeste',
      weather: Weather.SUNNY,
      showExtensionMessage: true,
      time: {
        hour: 0,
        minute: 0,
      },
      setVolume: (volume: number) => set({ volume }),
      setGame: (game: string) => set({ game }),
      setBackground: (background: string) => set({ background }),
      setTime: (time: { hour: number; minute: number }) => set({ time }),
      setWeather: (weather: Weather) => set({ weather }),
      // get the weather
      getWeather: () => {
        const { weather } = get();
        switch (weather) {
          case Weather.SUNNY:
            return '';
          case Weather.RAINY:
            return ' 🌧️';
          case Weather.SNOWY:
            return ' ❄️';
        }
      },
      setShowExtensionMessage: (showExtensionMessage: boolean) =>
        set({ showExtensionMessage }),
    }),
    {
      name: 'settings',
    }
  )
);
