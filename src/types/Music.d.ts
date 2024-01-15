import { NextMode } from './Enum';

export interface IMusic {
  album: string;
  name: string;
  index: null | number;
}

export interface IMusicStore {
  music: IMusic;
  hourlyMode: boolean;
  nextMode: NextMode;
  setMusic: (music: IMusic) => void;
  setHourlyMode: (hourlyMode: boolean) => void;
  setNextMode: (nextMode: NextMode) => void;
  setHourlyMusic: () => void;
  getMusicPath: () => string;
}
