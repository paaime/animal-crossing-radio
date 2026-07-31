/** @type {import('next').NextConfig} */

const YEAR = 60 * 60 * 24 * 365;
const MONTH = 60 * 60 * 24 * 30;

const cacheControl = (maxAge) => ({
  key: 'Cache-Control',
  value: `public, max-age=${maxAge}`,
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Track audio. Never edited in place — a track is replaced by adding
        // a new filename, so this can safely sit at the maximum.
        source: '/sounds/:path*',
        headers: [cacheControl(YEAR)],
      },
      {
        // Backgrounds, album artwork, icons and the OG image. Shorter, because
        // these do occasionally get re-exported (og-image.png just was).
        source: '/img/:path*',
        headers: [cacheControl(MONTH)],
      },
    ];
  },
};

module.exports = nextConfig;
