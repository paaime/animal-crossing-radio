import { IChatEmote } from '@/types/ChatEmote';

const EMOTE_CDN = 'https://static-cdn.jtvnw.net/emoticons/v2';
const EMOTE_ID_PATTERN = /^[A-Za-z0-9_-]+$/;
const RANGE_PATTERN = /^(\d+)-(\d+)$/;
const ACTION_PATTERN = /^\u0001ACTION (.*)\u0001$/;

const stripAction = (text: string): string =>
  ACTION_PATTERN.exec(text)?.[1] ?? text;

export function parseEmotesTag(
  tag: string | undefined,
  text: string,
): IChatEmote[] {
  if (!tag) return [];
  const codePoints = Array.from(stripAction(text));

  return tag
    .split('/')
    .flatMap((entry) => {
      const colon = entry.indexOf(':');
      if (colon === -1) return [];
      const id = entry.slice(0, colon);
      if (!EMOTE_ID_PATTERN.test(id)) return [];

      return entry
        .slice(colon + 1)
        .split(',')
        .flatMap((range) => {
          const match = RANGE_PATTERN.exec(range);
          if (!match) return [];
          const start = Number(match[1]);
          const end = Number(match[2]);
          if (end < start) return [];
          const name = codePoints.slice(start, end + 1).join('');
          return [{ start, emote: { id, name } }];
        });
    })
    .sort((a, b) => a.start - b.start)
    .map(({ emote }) => emote);
}

export const getEmoteImageUrl = (id: string): string =>
  `${EMOTE_CDN}/${encodeURIComponent(id)}/default/dark/3.0`;
