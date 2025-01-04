'use client';
import Button from '.';
import TwitchIcon from '../icons/TwitchIcon';
import Link from 'next/link';

export default function TwitchButton() {
  return (
    <Button>
      <Link href="https://www.twitch.tv/animal_crossing_radio" target="_blank">
        <TwitchIcon />
      </Link>
    </Button>
  );
}
