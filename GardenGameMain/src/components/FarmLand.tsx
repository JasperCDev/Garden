import { For, JSX } from "solid-js";
import { gameStore } from "stores/gameStore";
import styles from "./FarmLand.module.scss";
import Tile from "./Tile";

export default function FarmLand() {
  const farmLandStyle: () => JSX.CSSProperties = () => {
    return {
      "--columns": gameStore.farmLand.columns,
    };
  };

  return (
    <div style={farmLandStyle()} class={styles.farmLand}>
      <For each={gameStore.farmLand.tiles}>
        {(t) => {
          return <Tile tile={t} />;
        }}
      </For>
    </div>
  );
}
