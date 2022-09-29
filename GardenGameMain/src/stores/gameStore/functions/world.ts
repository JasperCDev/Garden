import { setNextTint, setNextCurrency, setNewTime } from ".";
import { gameStore } from "..";

export function tickWorldTime() {
  const currentTime = gameStore.world.time;
  const now = Date.now();
  let gameTime = now - currentTime.sessionTimeStamp;
  let dayTime = now - currentTime.dayTimeStamp;
  let dayTimeStamp = currentTime.dayTimeStamp;
  let day = currentTime.day;

  let dayLength = 1000 * 60; // 2 minutes

  let hourLength = dayLength / 24;
  let minuteLength = hourLength / 60;
  let hour = Math.floor(dayTime / hourLength);
  let minute = Math.floor((dayTime % hourLength) / minuteLength);
  setNextTint(hour);

  if (dayTime >= dayLength) {
    dayTime = 0.0;
    dayTimeStamp = now;
    day++;
    setNextCurrency();
  }

  const newTime = {
    ...currentTime,
    gameTime,
    dayTime,
    dayTimeStamp,
    day,
    hour,
    minute,
  };
  setNewTime(newTime);
}
