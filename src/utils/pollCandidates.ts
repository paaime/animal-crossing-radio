import { liveAlbums } from '@/data/liveAlbums';
import { IPollCandidate } from '@/types/Poll';
import { isWeatherVariant } from './trackName';
import { getLiveTrackWeight, pickWeighted } from './weightedPick';

interface FlatTrack extends IPollCandidate {
  uniqueId: string;
  weight: number;
}

const isWeatherTrack = (name: string) =>
  isWeatherVariant(name);

/** Every live track flattened to a candidate, skipping weather variants. */
function flattenLiveTracks(): FlatTrack[] {
  return liveAlbums.flatMap((album) => {
    const sounds = album.sounds.filter(
      (sound) => !isWeatherTrack(sound.name)
    );
    const weight = getLiveTrackWeight(album, sounds.length);

    return sounds.map((sound) => ({
      album: album.name,
      name: sound.name,
      index: album.sounds.findIndex((s) => s.name === sound.name),
      uniqueId: `${album.name}:${sound.name}`,
      weight,
    }));
  });
}

/**
 * Pick `count` distinct random live tracks for a poll, excluding the track
 * currently playing so the poll never offers what's already on. Each game
 * shows up in proportion to its live `share`.
 */
export function pickPollCandidates(
  count: number,
  exclude?: { album: string; name: string }
): IPollCandidate[] {
  const excludeId = exclude ? `${exclude.album}:${exclude.name}` : null;

  const pool = flattenLiveTracks().filter(
    (track) => track.uniqueId !== excludeId
  );

  // Weighted pick of `count` tracks without replacement.
  const target = Math.min(count, pool.length);
  const picked = Array.from({ length: target }).reduce<FlatTrack[]>(
    (chosen) => {
      const remaining = pool.filter((track) => !chosen.includes(track));
      return [...chosen, pickWeighted(remaining, (track) => track.weight)];
    },
    []
  );

  return picked.map(({ album, name, index }) => ({ album, name, index }));
}

/**
 * Duration (in seconds) of a live track, parsed from its "m:ss" label, or null
 * if the track isn't in the live pool. Used to size the poll countdown.
 */
export function getLiveTrackDurationSeconds(
  album: string,
  name: string
): number | null {
  const sound = liveAlbums
    .find((a) => a.name === album)
    ?.sounds.find((s) => s.name === name);
  if (!sound) return null;

  const [minutes, seconds] = sound.duration.split(':').map(Number);
  if (Number.isNaN(minutes) || Number.isNaN(seconds)) return null;

  return minutes * 60 + seconds;
}
