'use client';
import { useModalStore } from '@/stores/modal';
import Button from '.';
import SettingsIcon from '../icons/SettingsIcon';

export default function SettingsButton() {
  const { setSettingsOpen } = useModalStore();
  const audio = new Audio('/sounds/click.mp3');

  return (
    <Button
      onClick={() => {
        setSettingsOpen(true);
        audio.play();
      }}
    >
      <SettingsIcon />
    </Button>
  );
}
