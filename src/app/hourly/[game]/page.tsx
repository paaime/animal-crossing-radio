import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { hourlyGames } from '@/data/hourlyGames';
import {
  getGameBySlug,
  getHourlyRows,
  countHourlyTracks,
} from '@/utils/hourly';
import HourlyTable from '@/components/hourly/HourlyTable';
import { pageMetadata } from '@/config/metadata';
import GameCard from '@/components/hourly/GameCard';

export const dynamicParams = false;

export function generateStaticParams() {
  return hourlyGames.map((game) => ({ game: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { game: string };
}): Promise<Metadata> {
  const game = getGameBySlug(params.game);
  if (!game) return { title: 'Not found' };

  const hasRain = getHourlyRows(game.album).some((row) => row.rain);
  const title = `${game.title} Hourly Music — All 24 Tracks`;
  const description = `Listen to every hourly track from ${game.title} (${
    game.platform
  }, ${game.year}) — 12 AM through 11 PM${
    hasRain ? ', with rain and snow versions' : ', plus snow versions'
  }. Free, in your browser, synced to your own clock.`;

  return pageMetadata({
    title,
    description,
    path: `/hourly/${game.slug}`,
    openGraph: {
      type: 'music.playlist',
      images: [
        {
          url: `/img/artworks/${game.album}/512x512.png`,
          width: 512,
          height: 512,
          alt: `${game.title} album art`,
        },
      ],
    },
  });
}

export default function HourlyGamePage({
  params,
}: {
  params: { game: string };
}) {
  const game = getGameBySlug(params.game);
  if (!game) notFound();

  const rows = getHourlyRows(game.album);
  const others = hourlyGames.filter((entry) => entry.slug !== game.slug);
  const clearCount = rows.filter((row) => row.clear).length;
  const rainCount = rows.filter((row) => row.rain).length;
  const snowCount = rows.filter((row) => row.snow).length;

  return (
    <>
      <article>
        <header className="flex items-center gap-5 pt-4">
          <Image
            src={`/img/artworks/${game.album}/512x512.png`}
            alt=""
            width={88}
            height={88}
            className="rounded-xl"
            priority
          />
          <div>
            <h1 className="font-seurat text-2xl md:text-4xl leading-tight text-[#775B46]">
              {game.title} — Hourly Music
            </h1>
            <p className="mt-1.5 text-sm text-[#7a6f61]">
              {game.platform} · {game.year} · {countHourlyTracks(rows)} hourly
              tracks
            </p>
          </div>
        </header>

        <div className="mt-8 space-y-4 leading-relaxed">
          <p>{game.blurb}</p>
          <p>
            Every hour of the day has its own track, and the music changes on
            the hour just as it does in game. Below is the complete {clearCount}
            -track hourly list with durations — press play on any row to hear it
            right here, or{' '}
            <Link
              href={`/?game=${game.slug}`}
              className="custom-pointer font-medium text-[#775B46] underline"
            >
              open the radio with {game.album} selected
            </Link>{' '}
            to have it follow your own clock automatically.
          </p>
        </div>

        <h2 className="mt-12 font-seurat text-xl md:text-2xl text-[#775B46]">
          Full hourly tracklist
        </h2>
        <p className="mt-2 text-sm text-[#7a6f61]">
          {rainCount > 0
            ? `Includes ${rainCount} rain and ${snowCount} snow arrangements.`
            : `The GameCube original shipped ${snowCount} snow arrangements but no rain versions, so the rain column is empty.`}
        </p>
        <div className="mt-4">
          <HourlyTable game={game} rows={rows} />
        </div>

        <h2 className="mt-12 font-seurat text-xl md:text-2xl text-[#775B46]">
          How the weather changes the music
        </h2>
        <p className="mt-3 leading-relaxed">
          {rainCount > 0
            ? `In ${game.title} the hourly theme is re-arranged when it rains or snows — same melody, different instrumentation and mood. You can switch the weather in the radio's settings to hear any hour in any condition, without waiting for the real forecast.`
            : `${game.title} predates the rain arrangements later games added, but it does include a full set of snow versions for winter. You can switch to snow in the radio's settings to hear any hour in its winter arrangement.`}
        </p>

        <div className="mt-12 rounded-2xl bg-white/70 p-6">
          <h2 className="font-seurat text-xl text-[#775B46]">
            Listen along with your own clock
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#5b5145]">
            The radio reads the time on your device and plays the matching
            track, switching automatically when the hour turns.
          </p>
          <Link
            href={`/?game=${game.slug}`}
            className="custom-pointer mt-4 inline-block rounded-full bg-[#E2826A] px-5 py-2.5 font-medium text-white transition hover:opacity-90"
          >
            Open the radio with {game.album}
          </Link>
        </div>

        <h2 className="mt-12 font-seurat text-xl md:text-2xl text-[#775B46]">
          Other Animal Crossing soundtracks
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {others.map((other) => (
            <li key={other.slug}>
              <GameCard game={other} size={40} meta={other.platform} />
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
