/**
 * Turn a raw chat message into a zero-based candidate index, or null if the
 * message isn't a vote.
 *
 * Accepted (case-insensitive), anchored at the start of the message:
 *   "1"        -> 0
 *   "2!"       -> 1
 *   "!3"       -> 2
 *   "vote 2"   -> 1
 *   "!vote 4"  -> 3
 *   "1 nice"   -> 0   (leading number, extra text ignored)
 *
 * Rejected: "10" / "100" (multi-digit, avoids "1000 viewers"-style false
 * positives), "go 1" (not anchored), anything above `optionCount`.
 */
export function parseVote(message: string, optionCount: number): number | null {
  const match = message
    .trim()
    .match(/^!?(?:vote\s*)?#?([1-9])(?![0-9])/i);
  if (!match) return null;

  const choice = Number(match[1]); // 1-based
  if (choice < 1 || choice > optionCount) return null;

  return choice - 1; // zero-based index
}
