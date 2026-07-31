import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { hourlyGames } from '@/data/hourlyGames';
import { getHourlyRows, countHourlyTracks } from '@/utils/hourly';
import { pageMetadata } from '@/config/metadata';
import GameCard from '@/components/hourly/GameCard';

const description =
  'Every hourly Animal Crossing soundtrack in one place — New Horizons, New Leaf, City Folk, Wild World and the GameCube original. Full 24-hour tracklists with durations, rain and snow versions, playable free in your browser.';

export const metadata: Metadata = pageMetadata({
  title: 'Animal Crossing Hourly Music — Every Game, Every Hour',
  description,
  path: '/hourly',
});

export default function HourlyIndexPage() {
  const games = hourlyGames.map((game) => {
    const rows = getHourlyRows(game.album);
    return {
      game,
      rows,
      total: countHourlyTracks(rows),
      hasRain: rows.some((row) => row.rain),
    };
  });

  const grandTotal = games.reduce((sum, entry) => sum + entry.total, 0);

  return (
    <>
      <div className="pt-6">
        <h1 className="font-seurat text-3xl md:text-5xl leading-tight text-[#775B46]">
          Animal Crossing hourly music
        </h1>
        <div className="mt-5 space-y-4 leading-relaxed">
          <p>
            Every Animal Crossing game gives each hour of the day its own piece
            of music, and swaps it the moment the clock ticks over. Across the
            five games below that is {grandTotal} hourly tracks, counting the
            rain and snow arrangements.
          </p>
          <p>
            Pick a game to see its complete 24-hour tracklist with durations and
            play any track directly, or{' '}
            <Link
              href="/"
              className="custom-pointer font-medium text-[#775B46] underline"
            >
              open the radio
            </Link>{' '}
            to have the music follow your own clock.
          </p>
        </div>

        <h2 className="mt-12 font-seurat text-xl md:text-2xl text-[#775B46]">
          Choose a soundtrack
        </h2>
        <ul className="mt-5 space-y-3">
          {games.map(({ game, total, hasRain }) => (
            <li key={game.slug}>
              <GameCard
                game={game}
                label={game.title}
                size={56}
                meta={`${game.platform} · ${game.year} · ${total} hourly tracks${
                  hasRain ? ' · rain + snow' : ' · snow only'
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
