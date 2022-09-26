import { createStore } from "solid-js/store";
import defaultStore from "./defaultStore";
import GameStore from "./store.types";

declare global {
  interface Window {
    initialSaveData: any;
  }
}

window.initialSaveData = window.initialSaveData || {};

export const [gameStore, setGameStore] = createStore<GameStore>(
  window.initialSaveData || defaultStore
);
