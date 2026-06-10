import { create } from 'zustand';
import { IPollCandidate, IPollStore } from '@/types/Poll';

const computeTally = (
  candidates: IPollCandidate[],
  votes: Record<string, number>
): number[] => {
  const tally = new Array(candidates.length).fill(0);
  for (const choice of Object.values(votes)) {
    if (choice >= 0 && choice < tally.length) tally[choice] += 1;
  }
  return tally;
};

export const usePollStore = create<IPollStore>((set, get) => ({
  isOpen: false,
  candidates: [],
  votes: {},
  endsAt: null,

  openPoll: (candidates: IPollCandidate[], endsAt: number | null) =>
    set({ isOpen: true, candidates, votes: {}, endsAt }),

  closePoll: () => set({ isOpen: false, endsAt: null }),

  registerVote: (userId: string, choiceIndex: number) => {
    const { isOpen, candidates, votes } = get();
    if (!isOpen) return;
    if (choiceIndex < 0 || choiceIndex >= candidates.length) return;
    if (votes[userId] === choiceIndex) return; // no change, avoid re-render
    set({ votes: { ...votes, [userId]: choiceIndex } });
  },

  getTally: () => {
    const { candidates, votes } = get();
    return computeTally(candidates, votes);
  },

  getTotalVotes: () => Object.keys(get().votes).length,

  getWinner: () => {
    const { candidates, votes } = get();
    if (candidates.length === 0) return null;

    const tally = computeTally(candidates, votes);
    const max = Math.max(...tally);
    if (max === 0) return null; // nobody voted

    const leaders = candidates.filter((_, i) => tally[i] === max);
    return leaders[Math.floor(Math.random() * leaders.length)];
  },
}));
