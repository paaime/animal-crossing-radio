'use client';
import { useClickSound } from '@/hooks/useClickSound';
import Button from '.';
import ShuffleIcon from '../icons/SuffleIcon';
import { useModalStore } from '@/stores/modal';

export default function RandomModeButton() {
  const { setRandomPopupOpen } = useModalStore();
  const playClick = useClickSound();

  return (
    <Button
      onClick={() => {
        playClick();
        setRandomPopupOpen(true);
      }}
    >
      <ShuffleIcon height={30} />
    </Button>
  );
}
