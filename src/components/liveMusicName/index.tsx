import { liveAlbums } from '@/data/liveAlbums';
import { useMusicStore } from '@/stores/music';
import { NextMode } from '@/types/Enum';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LiveMusicName() {
  const { music } = useMusicStore((state) => state);
  const { setHourlyMode, setMusic, setNextMode } = useMusicStore(
    (state) => state
  );

  const startLive = () => {
    const nextAlbum = liveAlbums[Math.floor(Math.random() * liveAlbums.length)];
    const nextIndex = Math.floor(Math.random() * nextAlbum.sounds.length);
    const nextMusic = nextAlbum.sounds[nextIndex];
    setHourlyMode(false);
    setNextMode(NextMode.RANDOM);
    setMusic({
      album: nextAlbum?.name!,
      name: nextMusic.name,
      index: nextIndex,
    });
  };

  return (
    <div className=" absolute bottom-10 left-10">
      <div
        className="flex  h-full bg-black/55  rounded-2xl min-w-[500px]"
        onClick={startLive}
      >
        <Image
          src={`/img/artworks/${music.album}/512x512.png`}
          alt={music.name}
          width={110}
          height={110}
          className="rounded-2xl w-[110px] h-[110px] "
          priority
        />
        <div className="flex flex-col gap-0.5 tracking-tight text-white px-8 justify-center">
          <motion.p
            className="font-medium text-3xl"
            key={music.name} // Ensure the animation triggers when the music name changes
            initial={{ opacity: 0, y: -10 }} // Initial state
            animate={{ opacity: 1, y: 0 }} // Animate to this state
            exit={{ opacity: 0, y: 10 }} // Exit state
            transition={{ duration: 0.7 }} // Animation duration
          >
            {music.name}
          </motion.p>
          <motion.h1
            className="text-2xl font-extralight"
            key={music.album} // Ensure the animation triggers when the album changes
            initial={{ opacity: 0, y: 10 }} // Initial state
            animate={{ opacity: 1, y: 0 }} // Animate to this state
            exit={{ opacity: 0, y: -10 }} // Exit state
            transition={{ duration: 0.7 }} // Animation duration
          >
            {music.album}
          </motion.h1>
        </div>
      </div>
    </div>
  );
}
