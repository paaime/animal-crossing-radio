import Link from 'next/link';
import Image from 'next/image';
import { albums } from '@/data/albums';
import { hourlyGames } from '@/data/hourlyGames';
import { homeFaqs } from '@/data/faq';
import { getHourlyRows, countHourlyTracks } from '@/utils/hourly';
import { getSortedPosts } from '@/utils/blog';
import { SOCIAL_LINKS } from '@/config/site';
import SiteFooter from './SiteFooter';
import GameCard from '@/components/hourly/GameCard';

const totalTracks = albums.reduce(
  (count, album) => count + album.sounds.length,
  0,
);

const latestPosts = getSortedPosts().slice(0, 3);

export default function HomeContent() {
  const year = new Date().getFullYear();

  return (
    <div id="about" className="bg-[#F0F2E6] text-[#4b4034]">
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <h1 className="font-seurat text-3xl md:text-5xl leading-tight text-[#775B46]">
          Animal Crossing music, every hour of the day
        </h1>

        <div className="mt-6 space-y-4 text-base md:text-lg leading-relaxed">
          <p>
            Animal Crossing Radio streams the hourly background music from every
            Animal Crossing game, straight in your browser. It reads your own
            clock, so if it is 3 PM where you are, you hear the 3 PM track — and
            when the hour turns, the music turns with it, exactly as it does in
            the games.
          </p>
          <p>
            Pick between{' '}
            <strong>
              New Horizons, New Leaf, City Folk, Wild World and Population Growing
            </strong>
            , switch the weather to hear the rain and snow arrangements, or open
            the library and play any of the {totalTracks} tracks directly. It is
            free, there is no account, and nothing to install.
          </p>
        </div>

        <h2 className="mt-14 font-seurat text-2xl md:text-3xl text-[#775B46]">
          Every game, every hour
        </h2>
        <p className="mt-3 text-[#6b6052]">
          Full 24-hour tracklists, with durations and weather variants.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {hourlyGames.map((game) => {
            const rows = getHourlyRows(game.album);
            return (
              <li key={game.slug}>
                <GameCard
                  game={game}
                  meta={`${game.platform} · ${game.year} · ${countHourlyTracks(
                    rows
                  )} hourly tracks`}
                />
              </li>
            );
          })}
        </ul>

        <h2 className="mt-14 font-seurat text-2xl md:text-3xl text-[#775B46]">
          How it works
        </h2>
        <ol className="mt-6 space-y-4">
          <li>
            <strong>1. Press play.</strong> The radio starts on the track for
            your current hour. Browsers block audio until you interact with the
            page, so the first play has to be yours.
          </li>
          <li>
            <strong>2. Choose your game.</strong> Open settings to switch
            between the five soundtracks, change the weather, or nudge the clock
            if you would rather hear a different hour.
          </li>
          <li>
            <strong>3. Leave it running.</strong> Playback keeps going in a
            background tab and appears in your system media controls, so you can
            pause and skip without coming back.
          </li>
        </ol>

        <h2 className="mt-14 font-seurat text-2xl md:text-3xl text-[#775B46]">
          Frequently asked questions
        </h2>
        <dl className="mt-6 space-y-6">
          {homeFaqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-medium text-[#775B46]">{faq.question}</dt>
              <dd className="mt-1.5 leading-relaxed text-[#5b5145]">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-14 font-seurat text-2xl md:text-3xl text-[#775B46]">
          Listen beyond the browser
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={SOCIAL_LINKS.twitch}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-pointer rounded-xl bg-white/70 p-4 transition hover:bg-white"
          >
            <span className="block font-medium text-[#775B46]">
              24/7 stream on Twitch
            </span>
            <span className="mt-1 block text-sm text-[#7a6f61]">
              Always-on Animal Crossing music, and chat votes on the next song.
            </span>
          </a>
          <a
            href={SOCIAL_LINKS.chromeExtension}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-pointer rounded-xl bg-white/70 p-4 transition hover:bg-white"
          >
            <span className="block font-medium text-[#775B46]">
              Chrome extension
            </span>
            <span className="mt-1 block text-sm text-[#7a6f61]">
              The same hourly music from your toolbar, without keeping a tab
              open.
            </span>
          </a>
        </div>

        {latestPosts.length > 0 && (
          <>
            <h2 className="mt-14 font-seurat text-2xl md:text-3xl text-[#775B46]">
              From the blog
            </h2>
            <ul className="mt-6 space-y-4">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="custom-pointer group block"
                  >
                    <span className="block font-medium text-[#775B46] group-hover:underline">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-sm text-[#7a6f61]">
                      {post.meta}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <SiteFooter year={year} />
    </div>
  );
}
