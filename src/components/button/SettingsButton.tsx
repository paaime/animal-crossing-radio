'use client';
import { useClickSound } from '@/hooks/useClickSound';
import { useModalStore } from '@/stores/modal';
import Button from '.';
import SettingsIcon from '../icons/SettingsIcon';

export default function SettingsButton() {
  const { setSettingsOpen } = useModalStore();
  const playClick = useClickSound();

  return (
    <Button
      onClick={() => {
        setSettingsOpen(true);
        playClick();
      }}
    >
      <SettingsIcon />
    </Button>
  );
}
