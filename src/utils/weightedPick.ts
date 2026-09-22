import { ILiveAlbum } from '@/types/Album';

export function getLiveTrackWeight(
  album: ILiveAlbum,
  trackCount: number
): number {
  return trackCount > 0 ? album.share / trackCount : 0;
}

export function pickWeighted<T>(
  items: readonly T[],
  getWeight: (item: T) => number
): T {
  const weights = items.map((item) => Math.max(getWeight(item), 0));
  const total = weights.reduce((sum, weight) => sum + weight, 0);

  if (total <= 0) {
    return items[Math.floor(Math.random() * items.length)];
  }

  let roll = Math.random() * total;
  for (let i = 0; i < items.length; i += 1) {
    roll -= weights[i];
    if (roll < 0) return items[i];
  }
  // Floating-point leftovers: the roll landed on the very end of the range.
  return items[items.length - 1];
}
