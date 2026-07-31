'use client';

import { GoogleAnalytics } from 'nextjs-google-analytics';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-GBEQ7L6BRJ';

export default function Analytics() {
  if (process.env.NEXT_PUBLIC_ENV !== 'production') return null;

  return <GoogleAnalytics gaMeasurementId={GA_MEASUREMENT_ID} trackPageViews />;
}
