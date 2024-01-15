import { useMusicStore } from '@/stores/music';
import { ISound } from '@/types/Album';
import { useEffect, useState } from 'react';

export default function Music({
  sound,
  album,
  index,
}: {
  sound: ISound;
  album: string;
  index: number;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { music, setMusic, setHourlyMode } = useMusicStore((state) => state);

  useEffect(() => {
    if (music.name === sound.name && music.album === album) {
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
        setHourlyMode(false);
        setMusic({
          album,
          name: sound.name,
          index: index,
        });
      }}
    >
      <p className="text-sm sm:text-base">
        {sound.name}
        <span className="ml-2 text-xs sm:text-sm font-medium">
          {sound.duration}
        </span>
      </p>
      {/* <p className="text-sm text-[#4BB6B8] font-medium">{sound.type}</p> */}
    </div>
  );
}
