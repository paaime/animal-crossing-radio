'use client';
import Button from '.';
import SettingsIcon from '../icons/SettingsIcon';
import { Dispatch, SetStateAction } from 'react';

export default function SettingsButton({
  setSettingsOpen,
}: {
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
}) {
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
