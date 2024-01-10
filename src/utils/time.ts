export function convertTo12HourFormat(hour: number) {
  if (hour < 0 || hour > 23) {
    return 'Invalid hour';
  }

  const ampm = hour >= 12 ? 'PM' : 'AM';
  const twelveHour = hour % 12 === 0 ? 12 : hour % 12

  return `${twelveHour} ${ampm}`;
}

export function formatFileName(time: string, game: string) {
  game = game.toLowerCase().replace(' ', '-');
  return `/sounds/${game}/${time}.mp3`;
}
