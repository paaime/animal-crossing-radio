'use client';
import { useClickSound } from '@/hooks/useClickSound';
import { useMusicStore } from '@/stores/music';
import { IAlbum } from '@/types/Album';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function Album({
  album,
  setAlbum,
}: {
  album: IAlbum;
  setAlbum: Dispatch<SetStateAction<IAlbum | null>>;
}) {
  const soundsNb = album.sounds.length;
  const playClick = useClickSound();

  const [isPlaying, setIsPlaying] = useState(false);
  const { music } = useMusicStore((state) => state);

  useEffect(() => {
    if (music.album === album.name && music.index !== null) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [music]);

  return (
    <div
      className={`flex bg-[#FDFFF3] text-[#775B46] py-3 px-5 font-bold rounded-full justify-between items-center music-item ${
        isPlaying && 'active'
      }`}
      onClick={() => {
        playClick();
        setAlbum(album);
      }}
    >
      <p className="text-sm sm:text-base">
        {album.name}
        <span className="text-xs sm:text-sm font-medium">
          {' '}
          - {album.platform}
        </span>
      </p>
      <p className="text-xs sm:text-sm text-[#4BB6B8] font-medium">
        {soundsNb} musics
      </p>
    </div>
  );
}
