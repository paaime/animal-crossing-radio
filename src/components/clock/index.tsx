'use client';
import { useSettingsStore } from '@/stores/settings';
import { useTimeStore } from '@/stores/time';
import { useEffect } from 'react';

const SKELETON = 'inline-block h-[1em] rounded bg-white/30';

export default function Clock() {
  const customTime = useSettingsStore((state) => state.time);
  const { hour, minute, ampm, month, dayNb, day, ready } = useTimeStore(
    (state) => state,
  );

  const updateTime = useTimeStore((state) => state.updateTime);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
    }, 2000);
    return () => clearInterval(interval);
  }, [customTime]);

  useEffect(() => {
    updateTime();
  }, [customTime]);

  return (
    <div className="flex flex-col gap-1 font-medium text-white">
      <p className="text-3xl">
        {/* Same-shaped placeholder until the real local time is known, so the
            visitor never sees a wrong clock and nothing shifts when it lands. */}
        {ready ? (
          <>
            {hour}:{minute < 10 ? '0' + minute : minute}{' '}
            <span className="text-xl">{ampm}</span>
          </>
        ) : (
          <span className={`${SKELETON} w-[6ch] align-middle`} />
        )}
      </p>
      <div className="h-[2.5px] w-full bg-white rounded-full"></div>
      <div className="flex items-center text-xl">
        {ready ? (
          <>
            <p>
              {month} {dayNb}
            </p>
            <p className=" ml-3 bg-white rounded-full px-2  text-black text-sm font-medium">
              {day}
            </p>
          </>
        ) : (
          <span className={`${SKELETON} w-[9ch]`} />
        )}
      </div>
    </div>
  );
}
