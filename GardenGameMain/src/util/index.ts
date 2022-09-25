export function formatHour(h: number) {
  if (h === 0) {
    return "12am";
  }
  if (h === 12) {
    return "12pm";
  }
  if (h > 12) {
    return (h - 12).toString() + "pm";
  }

  return h.toString() + "am";
}
