'use client';
import Button from '.';
import TwitchIcon from '../icons/TwitchIcon';
import Link from 'next/link';
import { SOCIAL_LINKS } from '@/config/site';

export default function TwitchButton() {
  return (
    <Button>
      <Link href={SOCIAL_LINKS.twitch} target="_blank">
        <TwitchIcon />
      </Link>
    </Button>
  );
}
