export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://animal-crossing-radio.com';

export const SITE_NAME = 'Animal Crossing Radio';

export const SITE_DESCRIPTION =
  'Listen to hourly Animal Crossing music from every game, synced to your own clock. New Horizons, New Leaf, City Folk, Wild World and Population Growing — free, in your browser.';

export const SOCIAL_LINKS = {
  twitch: 'https://www.twitch.tv/animal_crossing_radio',
  twitter: 'https://twitter.com/crossing_radio_',
  reddit: 'https://www.reddit.com/user/AnimalCrossingRadio',
  chromeExtension:
    'https://chromewebstore.google.com/detail/animal-crossing-radio-liv/nffhjilgaekcabipkpjkfnkmdacnnink',
  email: 'contact@animal-crossing-radio.com',
} as const;

/** Default social share image. Dimensions must match the real file. */
export const OG_IMAGE = {
  url: '/img/og-image.png',
  width: 1200,
  height: 630,
  alt: SITE_NAME,
} as const;

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
