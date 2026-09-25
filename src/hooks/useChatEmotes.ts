import { useCallback, useEffect, useRef, useState } from 'react';
import { IEmoteFlight } from '@/types/ChatEmote';
import { TWITCH_CHANNEL } from '@/config/site';
import { subscribeToChat } from '@/utils/twitchChatBus';
import {
  addEmoteFlights,
  removeEmoteFlight,
} from '@/utils/chatEmotes/flights';

interface UseChatEmotesResult {
  flights: readonly IEmoteFlight[];
  land: (key: string) => void;
}

export function useChatEmotes(): UseChatEmotesResult {
  const [flights, setFlights] = useState<readonly IEmoteFlight[]>([]);
  const keyCounter = useRef(0);

  useEffect(() => {
    const createKey = () => {
      keyCounter.current += 1;
      return `emote-${keyCounter.current}`;
    };

    return subscribeToChat(TWITCH_CHANNEL, ({ userId, emotes }) => {
      if (!emotes || emotes.length === 0) return;
      setFlights((current) =>
        addEmoteFlights({ current, userId, emotes, createKey }),
      );
    });
  }, []);

  const land = useCallback((key: string) => {
    setFlights((current) => removeEmoteFlight(current, key));
  }, []);

  return { flights, land };
}
