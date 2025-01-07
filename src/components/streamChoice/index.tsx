import { motion, AnimatePresence } from 'framer-motion';
import TwitchIcon from '../icons/TwitchIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import { useEffect, useRef } from 'react';

export default function StreamChoice({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute rounded-[30px] z-30 w-[385px] font-seurat flex items-center justify-center bg-[#F0F2E6] bottom-[35vh]"
          style={{
            maxWidth: 'calc(100vw - 40px)',
          }}
          initial={{ opacity: 0, transform: 'scale(0.95)' }}
          animate={{ opacity: 1, transform: 'scale(1)' }}
          exit={{ opacity: 0, transform: 'scale(0.95)' }}
          ref={ref}
        >
          <span
            className="absolute top-[-15px] left-0 before:block before:absolute before:-inset-1 before:bg-[#E2826A] before:rounded-full inline-block w-fit z-20  text-md tracking-wide"
            style={{
              rotate: '-7deg',
              animation:
                'blob2 1.5s cubic-bezier(0.37, 0, 0.63, 1) 0.3s infinite alternate',
            }}
          >
            <span className="relative px-4 text-md text-white rotate-[0.022deg] font-medium">
              24/7 Stream
            </span>
          </span>
          <div className="w-full h-full p-7 flex flex-col">
            <div className="mb-6">
              <h2 className="text-[#775B46] text-xl font-bold mb-2">
                Choose Your Platform
              </h2>
              <p className="text-sm text-gray-600">
                Watch our 24/7 Animal Crossing Music Stream ! 🎶
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://www.youtube.com/@animalcrossingradio-b3c"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <YoutubeIcon />
                <span className="font-medium">YouTube</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://www.twitch.tv/animal_crossing_radio/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                <TwitchIcon />
                <span className="font-medium">Twitch</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
