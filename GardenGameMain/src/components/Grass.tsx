import { createSignal, JSX } from "solid-js";
import {
  castCreateSoil,
  gameStore,
  getSpellByName,
  TileObject,
} from "stores/gameStore";

import styles from "./Grass.module.scss";

interface Props {
  tile: TileObject;
}

export default function Grass(props: Props) {
  let ref: HTMLDivElement;
  const [isHovered, setIsHovered] = createSignal(false);

  const grassStyle: () => JSX.CSSProperties = () => {
    return {
      "--border": isHovered() ? "1px solid black" : "none",
    };
  };

  function handleGrassClick() {
    if (gameStore.player.selectedSpellId !== getSpellByName("Create Soil").id) {
      return;
    }
    castCreateSoil(props.tile.id);
  }

  return (
    <div class={styles.grass} style={grassStyle()}>
      {/* hitbox */}
      <div
        ref={(r) => (ref = r)}
        class={styles.hitbox}
        onClick={handleGrassClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></div>
    </div>
  );
}
