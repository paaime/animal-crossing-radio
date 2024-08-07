import Button from '.';
import PrevIcon from '../icons/PrevIcon';

export default function PrevButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button small={true} onClick={onClick}>
      <PrevIcon />
    </Button>
  );
}
