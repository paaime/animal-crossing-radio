export interface IHourlyGame {
  slug: string;
  album: string;
  title: string;
  platform: string;
  year: number;
  blurb: string;
}

export const hourlyGames: IHourlyGame[] = [
  {
    slug: 'new-horizons',
    album: 'New Horizons',
    title: 'Animal Crossing: New Horizons',
    platform: 'Nintendo Switch',
    year: 2020,
    blurb:
      'The island soundtrack most people met Animal Crossing through. New Horizons leans acoustic and airy in the morning, turns bright and percussive over the afternoon, and settles into soft synth pads after dark.',
  },
  {
    slug: 'new-leaf',
    album: 'New Leaf',
    title: 'Animal Crossing: New Leaf',
    platform: 'Nintendo 3DS',
    year: 2012,
    blurb:
      'Widely treated as the fan favourite. New Leaf keeps the series’ jazzy chord voicings but gives each hour a stronger melodic hook, which is why so many of these tracks turn up in study and lo-fi playlists.',
  },
  {
    slug: 'city-folk',
    album: 'City Folk',
    title: 'Animal Crossing: City Folk',
    platform: 'Nintendo Wii',
    year: 2008,
    blurb:
      'City Folk reworks the Wild World palette with fuller instrumentation. The evening hours in particular are warmer and more orchestral than anything in the handheld entries.',
  },
  {
    slug: 'wild-world',
    album: 'Wild World',
    title: 'Animal Crossing: Wild World',
    platform: 'Nintendo DS',
    year: 2005,
    blurb:
      'The DS soundtrack, written for a much smaller sound chip. The constraint gives Wild World its distinctive thin, chiming texture — the sound a lot of people actually mean when they say Animal Crossing music.',
  },
  {
    slug: 'population-growing',
    album: 'Population Growing',
    title: 'Animal Crossing (Population: Growing!)',
    platform: 'Nintendo GameCube',
    year: 2001,
    blurb:
      'Where the series began. The GameCube original is the rawest of the five — short loops, prominent synth brass, and a noticeably more melancholy set of late-night hours.',
  },
];

export const games: string[] = hourlyGames.map((game) => game.album);