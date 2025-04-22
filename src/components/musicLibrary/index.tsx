import { useEffect, useRef, useState } from 'react';
import Music from './components/Music';
import { albums } from '@/data/albums';
import { IAlbum } from '@/types/Album';
import Album from './components/Album';
import ReturnIcon from '../icons/ReturnIcon';
import LoopIcon from '../icons/LoopIcon';
import ShuffleIcon from '../icons/SuffleIcon';
import { useMusicStore } from '@/stores/music';
import { NextMode } from '@/types/Enum';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalStore } from '@/stores/modal';

export default function MusicLibrary() {
  const { libraryOpen, setLibraryOpen } = useModalStore();
  const audio = new Audio('/sounds/click.mp3');
  const { nextMode, setNextMode } = useMusicStore((state) => state);
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setLibraryOpen(false);
        setAlbum(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setLibraryOpen]);

  return (
    <AnimatePresence>
      {libraryOpen && (
        <motion.div
          className="absolute rounded-[30px] z-30 w-[500px] h-[400px] font-seurat flex items-center justify-center bg-[#F0F2E6]"
          ref={ref}
          style={{
            maxWidth: 'calc(100vw - 40px)',
            bottom: 'calc(50% - 200px)',
          }}
          initial={{ opacity: 0, transform: 'scale(0.95)' }}
          animate={{ opacity: 1, transform: 'scale(1)' }}
          exit={{ opacity: 0, transform: 'scale(0.95)' }}
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
              {album ? album.name : 'Music Library'}
            </span>
          </span>
          <span
            className={`rotate-[4deg] absolute top-[-20px] right-[80px] before:block before:absolute before:-inset-1 before:bg-[#E2826A] before:rounded-full w-fit z-20 text-md tracking-wide h-[35px] flex items-center justify-center library-player-button ${
              nextMode === NextMode.REPEAT && 'active'
            }`}
            onClick={() => {
              audio.play();
              if (nextMode === NextMode.REPEAT) setNextMode(NextMode.NEXT);
              else setNextMode(NextMode.REPEAT);
            }}
          >
            <span className="relative px-2 text-xl rotate-[0.022deg] font-medium">
              <LoopIcon />
            </span>
          </span>
          <span
            className={`rotate-[4deg] absolute top-[-20px] right-[25px] before:block before:absolute before:-inset-1 before:bg-[#E2826A] before:rounded-full w-fit z-20  text-md tracking-wide h-[35px] flex items-center justify-center library-player-button ${
              nextMode === NextMode.RANDOM && 'active'
            }`}
            onClick={() => {
              audio.play();
              if (nextMode === NextMode.RANDOM) setNextMode(NextMode.NEXT);
              else setNextMode(NextMode.RANDOM);
            }}
          >
            <span className="relative px-2 text-xl rotate-[0.022deg] font-medium">
              <ShuffleIcon />
            </span>
          </span>
          <div className="flex flex-col w-full px-6 md:px-10 gap-2 self-start pt-[30px] pb-[30px] overflow-x-scroll h-full no-scrollbar fade-out-scroll">
            {album ? (
              album.sounds.map((sound, index) => (
                <Music
                  sound={sound}
                  key={index}
                  album={album.name}
                  index={index}
                />
              ))
            ) : (
              <>
                {albums.map((album, index) => (
                  <Album album={album} key={index} setAlbum={setAlbum} />
                ))}
                <div className="flex items-center m-3">
                  <div className="h-[1.5px] rounded-full w-1/12 bg-[#775B46] mx-2"></div>
                  <p className="text-[#775B46] font-bold">Playlists</p>
                  <div className="h-[1.5px] rounded-full w-full bg-[#775B46] mx-2"></div>
                </div>
                <p className="text-[#775B46] text-sm ml-5">Coming soon...</p>
              </>
            )}
          </div>
          {album && (
            <span
              className="absolute bottom-[-10px] left-[-10px] before:block before:absolute before:-inset-1 before:bg-[#E2826A] before:rounded-full w-fit z-20  text-md tracking-wide h-[35px] flex items-center justify-center"
              style={{
                rotate: '-8deg',
                animation:
                  'blob2 1.5s cubic-bezier(0.37, 0, 0.63, 1) 0.3s infinite alternate',
              }}
              onClick={() => {
                audio.play();
                setAlbum(null);
              }}
            >
              <span className="relative px-4 text-xl rotate-[0.022deg] font-medium">
                <ReturnIcon />
              </span>
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
