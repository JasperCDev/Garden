import { gameStore } from "@/stores/gameStore";
import { For, onMount } from "solid-js";

export default function DayStart() {
  return (
    <For each={gameStore.plants.list}>
      {(plant) => {
        <div></div>;
      }}
    </For>
  );
}
