import { For } from "solid-js";
import styles from "./FarmLand.module.scss";
import Plant from "./Plant";

const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function FarmLand() {
  return (
    <div class={styles.farmLand}>
      <For each={tiles}>
        {(tile, i) => {
          return (
            <div class={styles.tile}>
              <Plant count={3000} />
            </div>
          );
        }}
      </For>
    </div>
  );
}
