import { createStore } from "solid-js/store";
import GameStore from "./store.types";

const initialData = window.initialSaveData;

export const [gameStore, setGameStore] = createStore<GameStore>(initialData);
