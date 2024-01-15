import Button from '.';
import NextIcon from '../icons/NextIcon';
import PauseIcon from '../icons/PauseIcon';
import PlayIcon from '../icons/PlayIcon';

export default function NextButton({
  onClick,
  isPlaying,
}: {
  onClick?: () => void;
  isPlaying?: boolean;
}) {
  return (
    <Button small={true} onClick={onClick}>
      <NextIcon />
    </Button>
  );
}
