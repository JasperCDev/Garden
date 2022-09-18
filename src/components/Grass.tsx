import { createSignal, JSX } from "solid-js";
import { CreateSoilTile, TileObject } from "../stores/farmLand.store";
import { getSpellByName, playerStore } from "../stores/player.store";
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
    if (playerStore.selectedSpellId !== getSpellByName("Create Soil").id) {
      return;
    }
    CreateSoilTile(props.tile.id);
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
