'use client';
import { useSettingsStore } from '@/stores/settings';
import { useTimeStore } from '@/stores/time';
import { useEffect } from 'react';

export default function Clock() {
  const customTime = useSettingsStore((state) => state.time);
  const { hour, minute, ampm, month, dayNb, day } = useTimeStore(
    (state) => state
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
        {hour}:{minute < 10 ? '0' + minute : minute}{' '}
        <span className="text-xl">{ampm}</span>
      </p>
      <div className="h-[2.5px] w-full bg-white rounded-full"></div>
      <div className="flex items-center text-xl">
        <p>
          {month} {dayNb}
        </p>
        <p className=" ml-3 bg-white rounded-full px-2  text-black text-sm font-medium">
          {day}
        </p>
      </div>
    </div>
  );
}
