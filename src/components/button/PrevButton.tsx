import Button from '.';
import PrevIcon from '../icons/PrevIcon';

export default function PrevButton({
  onClick,
  isPlaying,
}: {
  onClick?: () => void;
  isPlaying?: boolean;
}) {
  return (
    <Button small={true} onClick={onClick}>
      <PrevIcon />
    </Button>
  );
}
