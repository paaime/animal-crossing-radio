'use client';
import { useEffect, useState } from 'react';

export default function Clock() {
  let newHour = new Date().getHours();
  let newMinute = new Date().getMinutes();
  const [hour, setHour] = useState(newHour % 12 === 0 ? 12 : newHour % 12);
  const [minute, setMinute] = useState(
    newMinute < 10 ? '0' + newMinute : newMinute
  );
  const [ampm, setAmpm] = useState(newHour >= 12 ? 'PM' : 'AM');
  const [month, setMonth] = useState(
    new Date().toLocaleDateString('en-US', { month: 'short' })
  );
  const [dayNb, setDayNb] = useState(new Date().getDate());
  const [day, setDay] = useState(
    new Date().toLocaleDateString('en-US', { weekday: 'short' })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('tick');
      let newHour = new Date().getHours();
      setHour(newHour % 12 === 0 ? 12 : newHour % 12);
      let newMinute = new Date().getMinutes();
      setMinute(newMinute < 10 ? '0' + newMinute : newMinute);
      setAmpm(newHour >= 12 ? 'PM' : 'AM');
      setMonth(new Date().toLocaleDateString('en-US', { month: 'short' }));
      setDayNb(new Date().getDate());
      setDay(new Date().toLocaleDateString('en-US', { weekday: 'short' }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 font-medium">
      <p className="text-3xl">
        {hour}:{minute} <span className="text-xl">{ampm}</span>
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
