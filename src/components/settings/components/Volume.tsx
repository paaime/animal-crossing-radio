import { useSettingsStore } from '@/stores/settings';

export default function Volume() {
  const volume = useSettingsStore((state) => state.volume);
  const setVolume = useSettingsStore((state) => state.setVolume);
  return (
    <div className="absolute z-30 flex justify-center text-[#725D42] font-medium h-[100px] w-[275px] right-[-15px] md:-right-[125px] -top-[80px] md:-top-[50px]">
      <span className="absolute top-[-2px] left-5 before:block before:absolute before:-inset-1 -rotate-[8deg] before:bg-[#725d42] before:rounded-full inline-block w-fit z-20 tracking-wide text-md">
        <span className="relative px-3 rotate-[0.022deg] text-white">
          Volume
        </span>
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="658"
        // height="281"
        viewBox="0 0 658 281"
        fill="none"
        className="absolute h-full w-full"
      >
        <path
          d="M158.816 11.0734C24.9389 27.9536 -2.70988 105.903 0.20034 142.768C5.10608 182.95 14.893 214.237 71.9066 243.932C156.833 278.378 247.698 283.129 414.582 278.971C548.089 275.646 612.949 232.327 628.69 211.083C663.877 173.61 659.647 131.537 652.062 108.16C641.901 76.8464 601.724 40.2941 556.81 25.6253C512.426 3.06991 326.162 -10.0268 158.816 11.0734Z"
          fill="#FFEEA0"
        />
      </svg>
      <div className="z-30 p-5 flex flex-col items-center justify-center w-full">
        <div className="flex items-center gap-3 w-3/4">
          <input
            type="range"
            min="0"
            max="100"
            className="w-full bg-[#746D5A] rounded-full slider-range custom-pointer"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
