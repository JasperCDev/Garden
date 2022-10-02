interface Time {
  day: number;
  hour: number;
  minute: number;
}

export function formatHour(h: number) {
  if (h === 0) {
    return "12";
  }
  if (h > 12) {
    return (h - 12).toString();
  }

  return "0" + h.toString();
}

export function formatMinute(minute: number) {
  if (minute === 0) {
    return "00";
  }
  return minute.toString();
}

export function getDayPeriod(hour: number) {
  if (hour >= 12) return "am";
  return "pm";
}

export function formatTime(time: Time) {
  const formattedMinute = formatMinute(time.minute);
  const formattedHour = formatHour(time.hour);
  const dayPeriod = getDayPeriod(time.hour);
  return `${formattedHour}: ${formattedMinute}${dayPeriod} Day ${time.day}`;
}

export function getTimeFromFrameCount(frameCount: number): Time {
  const floor = Math.floor;

  const framesInADay = 60 * 60 * 5; // 5 minutes
  const framesInAnHour = framesInADay / 24;
  const framesInAQuarterHour = framesInAnHour / 4;

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
