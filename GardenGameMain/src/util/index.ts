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

export function formatTime(day: number, hour: number, minute: number) {
  const formattedMinute = formatMinute(minute);
  const formattedHour = formatHour(hour);
  const dayPeriod = getDayPeriod(hour);
  return `${formattedHour}: ${formattedMinute}${dayPeriod} Day ${day}`;
}
