import { IHourlyGame } from '@/data/hourlyGames';
import type { ISound } from '@/types/Album';
import { formatDuration } from '@/utils/hourly';
import PlayCell from './PlayCell';

export default function SoundtrackTable({
  game,
  tracks,
}: {
  game: IHourlyGame;
  tracks: ISound[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">
          Other tracks from the {game.title} soundtrack.
        </caption>
        <thead>
          <tr className="border-b border-[#d8d9c4] text-[#775B46]">
            <th scope="col" className="py-2.5 pr-4 font-medium">
              Track
            </th>
            <th scope="col" className="py-2.5 pr-4 font-medium">
              Length
            </th>
            <th scope="col" className="py-2.5 font-medium">
              Play
            </th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr
              key={track.name}
              className="border-b border-[#e4e5d4] last:border-0"
            >
              <th
                scope="row"
                className="py-2 pr-4 font-medium text-[#775B46]"
              >
                {track.name}
              </th>
              <td className="whitespace-nowrap py-2 pr-4 tabular-nums text-[#7a6f61]">
                {formatDuration(track.duration)}
              </td>
              <td className="py-2">
                <PlayCell
                  album={game.album}
                  track={track.name}
                  label={track.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
