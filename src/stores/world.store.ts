import { createStore } from "solid-js/store";

const loadTime = Date.now();

interface Store {
  time: {
    gameTime: number;
    dayTime: number;
    sessionTimeStamp: number;
    dayTimeStamp: number;
    day: number;
  };
}

export const [worldStore, setWorldStore] = createStore<Store>({
  time: {
    gameTime: 0.0,
    dayTime: 0.0,
    sessionTimeStamp: loadTime,
    dayTimeStamp: loadTime,
    day: 1,
  },
});

setInterval(() => {
  setWorldStore("time", (t) => {
    const now = Date.now();
    let gameTime = now - t.sessionTimeStamp;
    let dayTime = now - t.dayTimeStamp;
    let dayTimeStamp = t.dayTimeStamp;
    let day = t.day;

    let dayLength = 1000 * 10;

    if (dayTime > dayLength) {
      dayTime = 0.0;
      dayTimeStamp = now;
      day++;
    }

    return {
      ...t,
      gameTime,
      dayTime,
      dayTimeStamp,
      day,
    };
  });
}, 1000);
