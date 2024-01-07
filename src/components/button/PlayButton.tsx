import Button from '.';
import PauseIcon from '../icons/PauseIcon';
import PlayIcon from '../icons/PlayIcon';

export default function PlayButton({
  onClick,
  isPlaying,
}: {
  onClick?: () => void;
  isPlaying?: boolean;
}) {
  return (
    <Button onClick={onClick}>
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </Button>
  );
}
