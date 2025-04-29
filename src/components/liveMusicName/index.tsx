import { useMusicStore } from '@/stores/music';
import { NextMode } from '@/types/Enum';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LiveMusicName({
  handleNext,
}: {
  handleNext: () => void;
}) {
  const { music } = useMusicStore((state) => state);
  const { setHourlyMode, setMusic, setNextMode } = useMusicStore(
    (state) => state
  );

  const startLive = () => {
    setHourlyMode(false);
    setNextMode(NextMode.RANDOM_ALBUM);
    setMusic({
      album: 'New Horizons',
      name: '1 AM',
      index: 0,
    });
    handleNext();
  };

  return (
    <div className="absolute bottom-10 left-10">
      <div
        className="flex h-full bg-black/55 rounded-2xl min-w-[500px]"
        onClick={startLive}
      >
        <Image
          src={`/img/artworks/${music.album}/512x512.png`}
          alt={music.name}
          width={120}
          height={120}
          className="rounded-2xl w-[120px] h-[120px] "
          priority
        />
        <div className="flex flex-col gap-0.5 tracking-tight text-white px-8 justify-center">
          <motion.p
            className="font-semibold text-4xl"
            key={music.name} // Ensure the animation triggers when the music name changes
            initial={{ opacity: 0, y: -10 }} // Initial state
            animate={{ opacity: 1, y: 0 }} // Animate to this state
            exit={{ opacity: 0, y: 10 }} // Exit state
            transition={{ duration: 0.7 }} // Animation duration
          >
            {music.name}
          </motion.p>
          <motion.h1
            className="text-3xl font-light"
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
