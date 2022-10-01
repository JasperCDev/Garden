import Plant from "./Plant";
import styles from "./Soil.module.scss";
import { createSignal, JSX, Show } from "solid-js";
import Rain from "./Rain";
import {
  castCreatePlant,
  castRemovePlant,
  castWaterPlant,
  gameStore,
  getPlantById,
  getSpellByName,
  TileObject,
} from "../stores/gameStore";

interface Props {
  tile: TileObject;
}

export default function Soil(props: Props) {
  let ref: HTMLDivElement;
  const [isHovered, setIsHovered] = createSignal(false);
  const plant = () => getPlantById(props.tile.plantId);

  function handleSoilClick() {
    if (
      gameStore.player.selectedSpellId === getSpellByName("Water Plant").id &&
      plant()
    ) {
      castWaterPlant(plant());
      return;
    }

    if (
      gameStore.player.selectedSpellId === getSpellByName("Create Plant").id
    ) {
      castCreatePlant(props.tile.id);
      return;
    }

    if (gameStore.player.selectedSpellId === getSpellByName("SACRIFICE").id) {
      castRemovePlant(props.tile, plant());
      return;
    }
  }

  const soilStyle: () => JSX.CSSProperties = () => {
    return {
      "--border":
        isHovered() && plant().soil_moisture === 0 ? "1px solid black" : "none",
      "--soil-color": `hsl(27deg, 63%, ${65 - plant().soil_moisture * 20}%)`,
    };
  };

  return (
    <div class={styles.soil} style={soilStyle()}>
      {/* hitbox */}
      <div
        ref={(r) => (ref = r)}
        class={styles.hitbox}
        onClick={handleSoilClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></div>
      {/* plant */}
      <Show when={plant()}>
        <Plant plant={plant()} />
      </Show>
      {/* water animation */}
      {(plant().water || 0) > 0 && (
        <Rain
          width={window.innerWidth * 0.1} // 10vw
          height={window.innerWidth * 0.1 * 2} // 10vw * 2
          top={`${-(window.innerWidth * 0.1)}px`}
          left="0px"
        />
      )}
    </div>
  );
}
