import Link from 'next/link';
import Image from 'next/image';
import { IHourlyGame } from '@/data/hourlyGames';

export default function GameCard({
  game,
  meta,
  size = 48,
  label,
}: {
  game: IHourlyGame;
  meta: string;
  size?: number;
  label?: string;
}) {
  return (
    <Link
      href={`/hourly/${game.slug}`}
      className="custom-pointer group flex items-center gap-4 rounded-xl bg-white/70 p-4 transition hover:bg-white"
    >
      <Image
        src={`/img/artworks/${game.album}/192x192.png`}
        alt=""
        width={size}
        height={size}
        className="rounded-lg"
      />
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-[#775B46] group-hover:underline">
          {label ?? game.album}
        </span>
        <span className="block text-sm text-[#7a6f61]">{meta}</span>
      </span>
    </Link>
  );
}
