const TWITCH_LOGIN_PATTERN = /^[a-z0-9_]{1,25}$/i;
const TWITCH_URL_PREFIX = /^(?:https?:\/\/)?(?:www\.|m\.)?twitch\.tv\//i;

export function parseTwitchLogin(raw: string): string | null {
  const login = raw
    .trim()
    .replace(TWITCH_URL_PREFIX, '')
    .replace(/^@/, '')
    .replace(/\/+$/, '');

  return TWITCH_LOGIN_PATTERN.test(login) ? login : null;
}
