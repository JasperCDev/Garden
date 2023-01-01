import { Time } from "../stores/gameStore";

export function formatHour(h: number) {
  if (h === 0) {
    return "12";
  }
  if (h > 12) {
    return (h - 12).toString();
  }
  return h.toString();
}

export function formatMinute(minute: number) {
  if (minute === 0) {
    return "00";
  }
  return minute.toString();
}

export function getDayPeriod(hour: number) {
  if (hour >= 12) return "pm";
  return "am";
}

export function formatTime(time: Time) {
  const formattedMinute = formatMinute(time.minute);
  const formattedHour = formatHour(time.hour);
  const dayPeriod = getDayPeriod(time.hour);
  return `${formattedHour}: ${formattedMinute}${dayPeriod} Day ${time.day}`;
}

export const framesInADay = 60 * 60 * 0.25;
export const framesInAnHour = framesInADay / 24;
export const framesInAQuarterHour = framesInAnHour / 4;

export function getTimeFromFrameCount(frameCount: number): Time {
  const floor = Math.floor;

  const day = floor(frameCount / framesInADay) + 1;
  const hour = floor((frameCount % framesInADay) / framesInAnHour);
  const minute =
    floor((frameCount % framesInAnHour) / framesInAQuarterHour) * 15;

  return {
    day,
    hour,
    minute,
  };
}
