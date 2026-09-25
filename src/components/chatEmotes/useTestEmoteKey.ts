import { useEffect } from 'react';
import { IChatEmote } from '@/types/ChatEmote';
import { publishLocalMessage } from '@/utils/twitchChatBus';

const TEST_KEY = 'e';

const TEST_EMOTES: readonly IChatEmote[] = [
  { id: 'emotesv2_dcd06b30a5c24f6eb871e8f5edbd44f7', name: 'DinoDance' },
  { id: 'emotesv2_e9be57aca2ab42b2856d479df8acd82e', name: 'maddya8DANCE' },
  { id: '30259', name: 'HeyGuys' },
  { id: '58127', name: 'CoolCat' },
  { id: '58765', name: 'NotLikeThis' },
  { id: '64138', name: 'SeemsGood' },
  { id: '81274', name: 'VoHiYo' },
  { id: '425618', name: 'LUL' },
];
const MAX_TEST_EMOTES = 3;

const pickTestEmotes = (): IChatEmote[] => {
  const count = 1 + Math.floor(Math.random() * MAX_TEST_EMOTES);
  return Array.from(
    { length: count },
    () => TEST_EMOTES[Math.floor(Math.random() * TEST_EMOTES.length)],
  );
};

export function useTestEmoteKey(): void {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== TEST_KEY) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const emotes = pickTestEmotes();
      publishLocalMessage({
        userId: `test_${Math.floor(Math.random() * 100_000)}`,
        username: 'emote-test',
        text: emotes.map((emote) => emote.name).join(' '),
        emotes,
      });
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);
}
