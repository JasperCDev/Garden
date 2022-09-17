import { createStore } from "solid-js/store";
import { plants } from "./plants.store";

const loadTime = Date.now();

interface Store {
  time: {
    gameTime: number;
    dayTime: number;
    sessionTimeStamp: number;
    dayTimeStamp: number;
    day: number;
    morning: boolean;
    night: boolean;
  };
  tint: {
    opacity: number;
    color: string;
  };
  currency: {
    value: number;
  };
}

export const [worldStore, setWorldStore] = createStore<Store>({
  time: {
    gameTime: 0.0,
    dayTime: 0.0,
    sessionTimeStamp: loadTime,
    dayTimeStamp: loadTime,
    day: 1,
    morning: true,
    night: false,
  },
  tint: {
    opacity: 0.2,
    color: "orange",
  },
  currency: {
    value: 0,
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
      getNextCurrency();
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
  setWorldStore("tint", (t) => ({ ...t, opacity: 0.2, color: "#FF9500" }));
}

function setNight() {
  setWorldStore("tint", (t) => ({ ...t, opacity: 0.4, color: "#006AFF" }));
}

function getNextCurrency() {
  setWorldStore("currency", (c) => {
    const val = plants.reduce((a, b) => a + b.life, 0);
    console.log(val);
    return {
      ...c,
      value: Math.floor(val + c.value),
    };
  });
}
