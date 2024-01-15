export interface ISound {
  name: string;
  duration: string;
}

export interface IAlbum {
  name: string;
  platform: string;
  sounds: ISound[];
}
