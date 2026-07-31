'use client';
import { useClickSound } from '@/hooks/useClickSound';
import Button from '.';
import MusicIcon from '../icons/MusicIcon';
import { useModalStore } from '@/stores/modal';

export default function MusicButton() {
  const { setLibraryOpen } = useModalStore();
  const playClick = useClickSound();

  return (
    <Button
      onClick={() => {
        playClick();
        setLibraryOpen(true);
      }}
    >
      <MusicIcon />
    </Button>
  );
}
