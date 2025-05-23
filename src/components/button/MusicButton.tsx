import Button from '.';
import MusicIcon from '../icons/MusicIcon';
import { useModalStore } from '@/stores/modal';

export default function MusicButton() {
  const { setLibraryOpen } = useModalStore();
  const audio = new Audio('/sounds/click.mp3');

  return (
    <Button
      onClick={() => {
        audio.play();
        setLibraryOpen(true);
      }}
    >
      <MusicIcon />
    </Button>
  );
}
