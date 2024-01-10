import { useSettingsStore } from '@/stores/settings';
import DownArrow from '@/components/icons/DownArrow';
import UpArrow from '@/components/icons/UpArrow';
import { useEffect } from 'react';
import { useTimeStore } from '@/stores/time';
import ResetIcon from '@/components/icons/ResetIcon';

export default function Time() {
  const customTime = useSettingsStore((state) => state.time);
  const setTime = useSettingsStore((state) => state.setTime);

  const updateTime = useTimeStore((state) => state.updateTime);

  const { hour, minute, ampm } = useTimeStore((state) => state);

  const resetCustomTime = () => {
    setTime({ hour: 0, minute: 0 });
  };

  useEffect(() => {
    updateTime();
  }, [customTime]);

  const audio = new Audio('/sounds/click.mp3');

  return (
    <div className="absolute z-30 flex justify-center text-[#725D42] font-medium h-[135px] w-[275px] right-[-10px] md:-right-[125px] -top-[140px] md:-top-[50px]">
      <span className="absolute top-[-2px] left-5 before:block before:absolute before:-inset-1 -rotate-[8deg] before:bg-[#725d42] before:rounded-full inline-block w-fit z-20  text-md tracking-wide">
        <span className="relative px-3 rotate-[0.022deg] text-white">Time</span>
      </span>
      <span
        className="custom-pointer flex justify-center items-center absolute top-[8px] h-[25px] w-[25px] right-5 before:block before:absolute before:-inset-1 rotate-[10deg] before:bg-[#725d42] before:rounded-full z-20  text-md tracking-wide"
        onClick={resetCustomTime}
      >
        <span className="relative px-3 rotate-[0.022deg] text-white">
          <ResetIcon />
        </span>
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="658"
        viewBox="0 0 658 281"
        fill="none"
        className="absolute h-full w-full"
      >
        <path
          d="M158.816 11.0734C24.9389 27.9536 -2.70988 105.903 0.20034 142.768C5.10608 182.95 14.893 214.237 71.9066 243.932C156.833 278.378 247.698 283.129 414.582 278.971C548.089 275.646 612.949 232.327 628.69 211.083C663.877 173.61 659.647 131.537 652.062 108.16C641.901 76.8464 601.724 40.2941 556.81 25.6253C512.426 3.06991 326.162 -10.0268 158.816 11.0734Z"
          fill="#FFEEA0"
        />
      </svg>
      <div className="flex flex-col items-start justify-center gap-1 w-3/4 z-20">
        <div className="text-3xl flex items-center">
          <div className="flex flex-col gap-2 items-center">
            <UpArrow
              onClick={() => {
                let currentHour = new Date().getHours();
                if (currentHour + customTime.hour + 1 > 23) {
                  setTime({
                    hour: -currentHour,
                    minute: customTime.minute,
                  });
                } else
                  setTime({
                    hour: customTime.hour + 1,
                    minute: customTime.minute,
                  });
                audio.play();
              }}
            />
            <p>{hour}</p>
            <DownArrow
              onClick={() => {
                let currentHour = new Date().getHours();
                if (currentHour + customTime.hour - 1 < 0) {
                  setTime({
                    hour: 23 - currentHour,
                    minute: customTime.minute,
                  });
                } else
                  setTime({
                    hour: customTime.hour - 1,
                    minute: customTime.minute,
                  });
                audio.play();
              }}
            />
          </div>
          <span className="mx-2">:</span>
          <div className="flex flex-col gap-2 items-center">
            <UpArrow
              onClick={() => {
                let currentMinute = new Date().getMinutes();
                if (currentMinute + customTime.minute + 1 > 59) {
                  setTime({
                    hour: customTime.hour,
                    minute: -currentMinute,
                  });
                } else
                  setTime({
                    hour: customTime.hour,
                    minute: customTime.minute + 1,
                  });
                audio.play();
              }}
            />
            <p>{minute < 10 ? '0' + minute : minute}</p>
            <DownArrow
              onClick={() => {
                let currentMinute = new Date().getMinutes();
                if (currentMinute + customTime.minute - 1 < 0) {
                  setTime({
                    hour: customTime.hour,
                    minute: 59 - currentMinute,
                  });
                } else
                  setTime({
                    hour: customTime.hour,
                    minute: customTime.minute - 1,
                  });
                audio.play();
              }}
            />
          </div>
          <p className="ml-3">{ampm}</p>
        </div>
      </div>
    </div>
  );
}
