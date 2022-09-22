import { For } from "solid-js";
import { gameStore } from "../stores/gameStore";
import styles from "./FarmLand.module.scss";
import Tile from "./Tile";

export default function FarmLand() {
  return (
    <div class={styles.farmLand}>
      <For each={gameStore.farmLand.tiles}>
        {(t) => {
          return <Tile tile={t} />;
        }}
      </For>
    </div>
  );
}
