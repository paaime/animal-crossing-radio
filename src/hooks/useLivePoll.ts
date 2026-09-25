import { useCallback, useEffect, useRef } from 'react';
import { IMusic } from '@/types/Music';
import { usePollStore } from '@/stores/poll';
import { subscribeToChat } from '@/utils/twitchChatBus';
import { TWITCH_CHANNEL } from '@/config/site';
import { parseVote } from '@/utils/voteParser';
import {
  getLiveTrackDurationSeconds,
  pickPollCandidates,
} from '@/utils/pollCandidates';

interface UseLivePollArgs {
  isLive: boolean;
  hourlyMode: boolean;
  music: IMusic;
  setMusic: (music: IMusic) => void;
  /** Random next-track fallback, used when a poll gets no votes. */
  fallbackNext: () => void;
}

interface UseLivePollResult {
  /** Wire this to the live <audio>'s onEnded so the winner plays next. */
  onSongEnd: () => void;
}

/**
 * Drives the live Twitch song poll:
 *  - keeps an anonymous chat connection open and counts votes,
 *  - opens a fresh poll each time a new track starts (running for that whole
 *    track), and
 *  - resolves the winner when the track ends.
 */
export function useLivePoll({
  isLive,
  hourlyMode,
  music,
  setMusic,
  fallbackNext,
}: UseLivePollArgs): UseLivePollResult {
  const openPoll = usePollStore((state) => state.openPoll);
  const closePoll = usePollStore((state) => state.closePoll);

  // Count votes off the shared chat connection while live. The villager crowd
  // reads the same socket, so subscribing here must not open a second one.
  useEffect(() => {
    if (!isLive) return;

    return subscribeToChat(TWITCH_CHANNEL, ({ userId, text }) => {
      const { candidates, registerVote } = usePollStore.getState();
      if (candidates.length === 0) return; // no open poll
      const choice = parseVote(text, candidates.length);
      if (choice !== null) registerVote(userId, choice);
    });
  }, [isLive]);

  // Open a new poll whenever a track starts; close it outside live playback.
  useEffect(() => {
    if (!isLive || hourlyMode || music.index === null) {
      closePoll();
      return;
    }

    const candidates = pickPollCandidates(4, {
      album: music.album,
      name: music.name,
    });
    if (candidates.length === 0) {
      closePoll();
      return;
    }

    const durationSeconds = getLiveTrackDurationSeconds(
      music.album,
      music.name,
    );
    const endsAt =
      durationSeconds !== null ? Date.now() + durationSeconds * 1000 : null;

    openPoll(candidates, endsAt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLive, hourlyMode, music.album, music.name, music.index]);

  const onSongEnd = useCallback(() => {
    const winner = usePollStore.getState().getWinner();
    if (winner) {
      // Setting the music triggers the player's change/play effect, and the
      // music change reopens a fresh poll for the following track.
      setMusic(winner);
    } else {
      fallbackNext();
    }
  }, [setMusic, fallbackNext]);

  return { onSongEnd };
}
