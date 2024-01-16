import { create } from 'zustand';
import { useSettingsStore } from './settings';
import { useTimeStore } from './time';
import { IMusic, IMusicStore } from '@/types/Music';
import { NextMode } from '@/types/Enum';

export const useMusicStore = create<IMusicStore>((set, get) => ({
  hourlyMode: true,
  nextMode: NextMode.NEXT,
  music: {
    album: useSettingsStore.getState().game,
    name: `${useTimeStore.getState().hour} ${useTimeStore.getState().ampm}`,
    index: null,
  },
  getMusicPath: () => {
    const { album, name } = get().music;
    return `/sounds/${album}/${name}.mp3`;
  },
  setNextMode: (nextMode: NextMode) => set({ nextMode }),
  setMusic: (music: IMusic) => set({ music }),
  setHourlyMusic: () => {
    const weather = useSettingsStore.getState().getWeather();
    const { hour, ampm } = useTimeStore.getState();
    set({
      music: {
        album: useSettingsStore.getState().game,
        name: `${hour} ${ampm}${weather}`,
        index: null,
      },
      hourlyMode: true,
    });
  },
  setHourlyMode: (hourlyMode: boolean) => set({ hourlyMode }),
}));
