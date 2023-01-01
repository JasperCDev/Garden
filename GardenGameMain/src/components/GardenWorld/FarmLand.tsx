import { createEffect, For, JSX } from "solid-js";
import { addPlantParticle, gameStore, setIsDayStart } from "@/stores/gameStore";
import styles from "./FarmLand.module.scss";
import Tile from "./Tile";

export default function FarmLand() {
  const farmLandStyle: () => JSX.CSSProperties = () => {
    return {
      "--columns": gameStore.farmLand.columns,
    };
  };

  createEffect(() => {
    if (
      gameStore.world.isDayStart &&
      Object.keys(gameStore.plantParticles).length === 1
    ) {
      setIsDayStart(false);
    }
  });

  return (
    <div style={farmLandStyle()} class={styles.farmLand}>
      <For each={gameStore.farmLand.tiles}>
        {(t) => {
          if (gameStore.world.isDayStart && t.plantId > 0) {
            addPlantParticle(t.id);
          }

          return <Tile tile={t} />;
        }}
      </For>
    </div>
  );
}
