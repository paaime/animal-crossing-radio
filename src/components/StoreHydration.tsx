'use client';

import { useEffect } from 'react';
import { useSettingsStore } from '@/stores/settings';
import { useTimeStore } from '@/stores/time';
import { useMusicStore } from '@/stores/music';

export default function StoreHydration() {
  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      try {
        // Settings first: it carries the time offset and weather that the
        // time and music stores both read.
        await useSettingsStore.persist.rehydrate();
      } catch (error) {
        // A corrupt or unavailable localStorage entry must not leave the app
        // stuck on the placeholder clock — carry on with defaults.
        console.error('Failed to rehydrate settings, using defaults:', error);
      }

      if (cancelled) return;

      useTimeStore.getState().updateTime();
      useMusicStore.getState().setHourlyMusic();
    };

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
