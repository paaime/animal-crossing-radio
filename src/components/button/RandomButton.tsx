import Button from '.';
import ShuffleIcon from '../icons/SuffleIcon';
import { useModalStore } from '@/stores/modal';

export default function RandomModeButton() {
  const { setRandomPopupOpen } = useModalStore();
  const audio = new Audio('/sounds/click.mp3');

  return (
    <Button
      onClick={() => {
        audio.play();
        setRandomPopupOpen(true);
      }}
    >
      <ShuffleIcon height={30} />
    </Button>
  );
}
