import { useSettingsStore } from '@/stores/settings';
import { games } from '@/data/games';

export default function Games() {
  const activeGame = useSettingsStore((state) => state.game);
  const setGame = useSettingsStore((state) => state.setGame);

  const audio = new Audio('/sounds/click.mp3');

  return (
    <div className="absolute z-30 flex justify-center text-[#725D42] font-medium h-[230px] w-[265px] right-[-15px] md:-right-[125px] -top-[220px] md:-top-[180px]">
      <span className="absolute top-[-2px] left-5 before:block before:absolute before:-inset-1 -rotate-[8deg] before:bg-[#725d42] before:rounded-full inline-block w-fit z-20 text-md tracking-wide" >
        <span className="relative px-3 rotate-[0.022deg] text-white">
          Games
        </span>
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="537"
        height="480"
        viewBox="0 0 537 480"
        fill="none"
        className="absolute w-full h-[230px]"
      >
        <path
          d="M158.233 10.511C35.2531 32.5937 2.63331 143.27 1.69592 195.848C-5.79274 287.444 9.44688 400.297 89.4218 442.914C193.767 498.518 345.068 479.495 407.676 463.034C444.849 453.584 522.195 404.504 534.195 283.786C549.195 132.889 500.898 77.1358 463.808 49.9443C435.687 14.4542 311.958 -17.0925 158.233 10.511Z"
          fill="#FFEEA0"
        />
      </svg>
      <div className="flex flex-col items-start justify-center ml-12 text-[#7C684D] font-seurat gap-1 w-3/4">
        {games.map((game, key) => (
          <span
            key={key}
            className={`hover:before:absolute before:${
              game === activeGame ? 'absolute font-bold' : 'hidden'
            }  before:h-[13px] before:top-[10px] before:-inset-1 before:bg-[#FFCC00] before:rounded-full relative inline-block w-fit`}
            onClick={() => {
              audio.play();
              setGame(game);
            }}
          >
            <h2 className="relative">{game}</h2>
          </span>
        ))}
      </div>
    </div>
  );
}
