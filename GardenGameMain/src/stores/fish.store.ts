import { createStore } from "solid-js/store";

interface Store {
  fish: HTMLDivElement | null;
  fishFood: Array<{ x: number; y: number }>;
  fishStartingPos: { x: number; y: number } | null;
}

export const [fishStore, setFishStore] = createStore<Store>({
  fish: null,
  fishFood: [],
  fishStartingPos: null,
});
