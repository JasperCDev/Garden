import { For } from "solid-js";
import { plants } from "../stores/plants.store";
import styles from "./FarmLand.module.scss";
import PlantContainer from "./PlantContainer";

export default function FarmLand() {
  return (
    <div class={styles.farmLand}>
      <For each={plants}>
        {(plant) => {
          return (
            <div class={styles.tile}>
              <PlantContainer plant={plant} />
            </div>
          );
        }}
      </For>
    </div>
  );
}
