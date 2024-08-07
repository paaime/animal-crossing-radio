import Button from '.';
import NextIcon from '../icons/NextIcon';

export default function NextButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button small={true} onClick={onClick}>
      <NextIcon />
    </Button>
  );
}
