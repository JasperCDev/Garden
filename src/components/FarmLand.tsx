import { createEffect, For } from "solid-js";
import { farmLand } from "../stores/farmLand.store";
import styles from "./FarmLand.module.scss";
import Tile from "./Tile";

export default function FarmLand() {
  return (
    <div class={styles.farmLand}>
      <For each={farmLand.tiles}>
        {(t) => {
          return <Tile tile={t} />;
        }}
      </For>
    </div>
  );
}
