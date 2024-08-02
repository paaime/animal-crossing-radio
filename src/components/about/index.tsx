import Link from 'next/link';
import RedditIcon from '../icons/RedditIcon';
import XIcon from '../icons/XIcon';
import { motion, AnimatePresence } from 'framer-motion';

export default function About({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute rounded-[30px] z-30 w-[375px] font-seurat flex items-center justify-center bg-[#F0F2E6]"
          style={{
            maxWidth: 'calc(100vw - 40px)',
            bottom: '35vh',
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
              About
            </span>
          </span>
          <div className="w-full h-full p-7 flex flex-col">
            <div className="flex items-center mb-3">
              <p className="text-[#775B46] text-lg font-bold">Socials</p>
            </div>
            <div className="flex gap-5">
              <a
                href="https://twitter.com/crossing_radio_"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded-xl w-10 h-10 flex items-center justify-center"
              >
                <XIcon />
              </a>
              <a
                href="https://www.reddit.com/user/AnimalCrossingRadio"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 rounded-xl w-10 h-10 flex items-center justify-center"
              >
                <RedditIcon />
              </a>
            </div>
            <div className="flex items-center mb-3 mt-3">
              <p className="text-[#775B46] font-bold text-lg">Email</p>
            </div>
            <p className="text-sm ">contact@animal-crossing-radio.com</p>
            <div className="flex items-center mb-3 mt-3">
              <p className="text-[#775B46] font-bold text-lg">Blogs</p>
            </div>
            <Link href="/blog" className="text-sm">
              Read our latest blogs
            </Link>
            <div className="flex items-center mb-3 mt-3">
              <p className="text-[#775B46] font-bold text-lg">Made by</p>
            </div>
            <p className="text-sm ">An Animal Crossing Fan ❤️</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
