import { liveAlbums } from '@/data/liveAlbums';
import { IPollCandidate } from '@/types/Poll';
import { isWeatherVariant } from './trackName';

interface FlatTrack extends IPollCandidate {
  uniqueId: string;
}

const isWeatherTrack = (name: string) =>
  isWeatherVariant(name);

/** Every live track flattened to a candidate, skipping weather variants. */
function flattenLiveTracks(): FlatTrack[] {
  return liveAlbums.flatMap((album) =>
    album.sounds
      .filter((sound) => !isWeatherTrack(sound.name))
      .map((sound) => ({
        album: album.name,
        name: sound.name,
        index: album.sounds.findIndex((s) => s.name === sound.name),
        uniqueId: `${album.name}:${sound.name}`,
      }))
  );
}

/**
 * Pick `count` distinct random live tracks for a poll, excluding the track
 * currently playing so the poll never offers what's already on.
 */
export function pickPollCandidates(
  count: number,
  exclude?: { album: string; name: string }
): IPollCandidate[] {
  const excludeId = exclude ? `${exclude.album}:${exclude.name}` : null;

  const pool = flattenLiveTracks().filter(
    (track) => track.uniqueId !== excludeId
  );

  // Fisher–Yates partial shuffle: pick `count` without replacement.
  const picked: FlatTrack[] = [];
  const working = [...pool];
  const target = Math.min(count, working.length);
  for (let i = 0; i < target; i += 1) {
    const j = i + Math.floor(Math.random() * (working.length - i));
    [working[i], working[j]] = [working[j], working[i]];
    picked.push(working[i]);
  }

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
