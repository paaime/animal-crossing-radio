'use client';

import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ads = [
  {
    title: 'Listen on our website',
    subtitle: 'Link in the bio',
  },
  {
    title: '24/7 Animal Crossing Music',
    subtitle: 'Relaxing tunes all day long',
  },
];

export default function LiveAds() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 30000); // Switch every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-10 right-10">
      <div className="flex gap-5 h-full bg-black/65 px-8 py-4 rounded-2xl items-center justify-center">
        <Image
          src="/img/icon512.png"
          alt="Logo"
          width={256}
          height={256}
          className="rounded-2xl w-[50px] h-[50px] rounded-r-none"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAdIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col text-center text-xl text-white justify-center"
          >
            <p className="font-medium text-3xl whitespace-nowrap">
              {ads[currentAdIndex].title}
            </p>
            <h1 className="text-2xl font-extralight">
              {ads[currentAdIndex].subtitle}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
