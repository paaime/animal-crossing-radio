/** A single song that viewers can vote for in a live poll. */
export interface IPollCandidate {
  album: string;
  name: string;
  index: number;
}

/** Tally entry: a candidate paired with its current vote count. */
export interface IPollResult {
  candidate: IPollCandidate;
  votes: number;
}

export interface IPollStore {
  isOpen: boolean;
  candidates: IPollCandidate[];
  /** Map of stable Twitch user id -> chosen candidate index (last vote wins). */
  votes: Record<string, number>;
  /** When the current poll closes (epoch ms), used to drive the countdown UI. */
  endsAt: number | null;
  openPoll: (candidates: IPollCandidate[], endsAt: number | null) => void;
  closePoll: () => void;
  registerVote: (userId: string, choiceIndex: number) => void;
  /** Per-candidate vote counts, aligned with `candidates`. */
  getTally: () => number[];
  /** Total votes cast in the current poll. */
  getTotalVotes: () => number;
  /** Winning candidate, or null when no votes were cast. Ties broken randomly. */
  getWinner: () => IPollCandidate | null;
}
