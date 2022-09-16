import { createStore } from "solid-js/store";

const loadTime = Date.now();

interface Store {
  time: {
    gameTime: number;
    dayTime: number;
    sessionTimeStamp: number;
    dayTimeStamp: number;
    day: number;
    name: "morning" | "night";
    morning: boolean;
    night: boolean;
  };
  tint: {
    opacity: number;
    color: string;
  };
}

export const [worldStore, setWorldStore] = createStore<Store>({
  time: {
    gameTime: 0.0,
    dayTime: 0.0,
    sessionTimeStamp: loadTime,
    dayTimeStamp: loadTime,
    day: 1,
    name: "morning",
    morning: true,
    night: false,
  },
  tint: {
    opacity: 0.2,
    color: "orange",
  },
});

setInterval(() => {
  setWorldStore("time", (t) => {
    const now = Date.now();
    let gameTime = now - t.sessionTimeStamp;
    let dayTime = now - t.dayTimeStamp;
    let dayTimeStamp = t.dayTimeStamp;
    let day = t.day;

    let dayLength = 1000 * 20;

    if (t.dayTime >= 1000 * 10 && t.morning) {
      setNight();
    }

    if (dayTime >= dayLength) {
      dayTime = 0.0;
      dayTimeStamp = now;
      day++;
      setMorning();
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

function setMorning() {
  setWorldStore("tint", (t) => ({ ...t, opacity: 0.2, color: "orange" }));
}

function setNight() {
  setWorldStore("tint", (t) => ({ ...t, opacity: 0.3, color: "midnightblue" }));
}
