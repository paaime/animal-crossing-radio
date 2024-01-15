import { Dispatch, SetStateAction } from 'react';
import Button from '.';
import MusicIcon from '../icons/MusicIcon';

export default function MusicButton({
  setLibraryOpen,
}: {
  setLibraryOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const audio = new Audio('/sounds/click.mp3');

  return (
    <Button
      onClick={() => {
        audio.play();
        setLibraryOpen((prev) => !prev);
      }}
    >
      <MusicIcon />
    </Button>
  );
}
