import { createStore } from "solid-js/store";
import defaultStore from "./defaultStore";
import GameStore from "./store.types";

export const [gameStore, setGameStore] = createStore<GameStore>(defaultStore);
