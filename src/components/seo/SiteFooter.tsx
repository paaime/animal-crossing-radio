import Link from 'next/link';
import { hourlyGames } from '@/data/hourlyGames';
import { SITE_NAME, SOCIAL_LINKS } from '@/config/site';

export default function SiteFooter({ year }: { year: number }) {
  return (
    <footer className="border-t border-[#d8d9c4] bg-[#e7e9d6] text-[#4b4034]">
      <div className="mx-auto max-w-4xl px-5 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h2 className="font-seurat text-lg text-[#775B46]">Hourly music</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {hourlyGames.map((game) => (
                <li key={game.slug}>
                  <Link
                    href={`/hourly/${game.slug}`}
                    className="custom-pointer hover:underline"
                  >
                    {game.album}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-seurat text-lg text-[#775B46]">Explore</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href="/" className="custom-pointer hover:underline">
                  Radio player
                </Link>
              </li>
              <li>
                <Link href="/hourly" className="custom-pointer hover:underline">
                  All hourly soundtracks
                </Link>
              </li>
              <li>
                <Link href="/blog" className="custom-pointer hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.chromeExtension}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-pointer hover:underline"
                >
                  Chrome extension
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-seurat text-lg text-[#775B46]">Follow</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <a
                  href={SOCIAL_LINKS.twitch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-pointer hover:underline"
                >
                  24/7 stream on Twitch
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.reddit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-pointer hover:underline"
                >
                  Reddit
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="custom-pointer hover:underline"
                >
                  {SOCIAL_LINKS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-xs text-[#7a6f61]">
          {SITE_NAME} • © {year} — a fan project. Animal Crossing and its music
          are trademarks of Nintendo. This site is not affiliated with or
          endorsed by Nintendo.
        </p>
      </div>
    </footer>
  );
}
