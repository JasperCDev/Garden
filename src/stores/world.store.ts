import { createStore } from "solid-js/store";

interface Store {
  time: {
    gameTime: number;
    dayTime: number;
    sessionTimeStamp: number;
  };
}

export const [worldStore, setWorldStore] = createStore<Store>({
  time: {
    gameTime: 0.0,
    dayTime: 0.0,
    sessionTimeStamp: Date.now(),
  },
});

setInterval(() => {
  setWorldStore("time", (t) => {
    const now = Date.now();
    return {
      ...t,
      gameTime: now - t.sessionTimeStamp,
      dayTime: now - t.sessionTimeStamp,
    };
  });
}, 1000);
