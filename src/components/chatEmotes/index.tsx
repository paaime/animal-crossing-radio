'use client';

import { useChatEmotes } from '@/hooks/useChatEmotes';
import FloatingEmote from './FloatingEmote';
import { useTestEmoteKey } from './useTestEmoteKey';

export default function ChatEmotes() {
  const { flights, land } = useChatEmotes();
  useTestEmoteKey();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {flights.map((flight) => (
        <FloatingEmote key={flight.key} flight={flight} onLand={land} />
      ))}
    </div>
  );
}
