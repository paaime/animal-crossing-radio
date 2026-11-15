import { albums } from '@/data/albums';
import { liveAlbums } from '@/data/liveAlbums';
import { ILiveAlbum } from '@/types/Album';

const kkLiveAlbum: ILiveAlbum = {
  ...albums.find((album) => album.name === 'K.K. Slider Live')!,
  share: 100,
};

export function getLiveAlbums(): ILiveAlbum[] {
  const now = new Date();
  const isKKNight = now.getDay() === 6 && now.getHours() >= 18;
  return isKKNight ? [kkLiveAlbum] : liveAlbums;
}
