import { IHourlyGame } from '@/data/hourlyGames';
import { IHourlyRow, formatDuration, soundUrl } from '@/utils/hourly';
import PlayCell from './PlayCell';

export default function HourlyTable({
  game,
  rows,
}: {
  game: IHourlyGame;
  rows: IHourlyRow[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
        <caption className="sr-only">
          Hourly tracklist for {game.title}, 12 AM through 11 PM, with weather
          variants.
        </caption>
        <thead>
          <tr className="border-b border-[#d8d9c4] text-[#775B46]">
            <th scope="col" className="py-2.5 pr-4 font-medium">
              Hour
            </th>
            <th scope="col" className="py-2.5 pr-4 font-medium">
              Track
            </th>
            <th scope="col" className="py-2.5 pr-4 font-medium">
              Length
            </th>
            <th scope="col" className="py-2.5 pr-4 font-medium">
              Play
            </th>
            <th scope="col" className="py-2.5 pr-4 font-medium">
              Rain
            </th>
            <th scope="col" className="py-2.5 font-medium">
              Snow
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.hour}
              className="border-b border-[#e4e5d4] last:border-0"
            >
              <th
                scope="row"
                className="whitespace-nowrap py-2.5 pr-4 font-normal text-[#7a6f61]"
              >
                {row.label}
              </th>
              <td className="py-2.5 pr-4">
                {row.clear ? (
                  <p className="font-medium text-[#775B46]">
                    {row.label} — {game.album}
                  </p>
                ) : (
                  <span className="text-[#a29886]">—</span>
                )}
              </td>
              <td className="whitespace-nowrap py-2.5 pr-4 tabular-nums text-[#7a6f61]">
                {row.clear ? formatDuration(row.clear.duration) : '—'}
              </td>
              <td className="py-2.5 pr-4">
                {row.clear ? (
                  <PlayCell
                    album={game.album}
                    track={row.clear.name}
                    label={`the ${row.label} track`}
                  />
                ) : (
                  <span className="text-[#a29886]">—</span>
                )}
              </td>
              <td className="py-2.5 pr-4">
                {row.rain ? (
                  <PlayCell
                    album={game.album}
                    track={row.rain.name}
                    label={`the ${row.label} rain version`}
                  />
                ) : (
                  <span className="text-[#a29886]">—</span>
                )}
              </td>
              <td className="py-2.5">
                {row.snow ? (
                  <PlayCell
                    album={game.album}
                    track={row.snow.name}
                    label={`the ${row.label} snow version`}
                  />
                ) : (
                  <span className="text-[#a29886]">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
