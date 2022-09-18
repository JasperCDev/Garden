import Plant from "./Plant";
import { editPlant, getPlantById } from "../stores/plants.store";
import { animateCount } from "../util/animateCount";
import styles from "./Soil.module.scss";
import { createSignal, JSX } from "solid-js";
import Rain from "./Rain";
import { getSpellByName, playerStore } from "../stores/player.store";

interface Props {
  plantId: number;
}

export default function Soil(props: Props) {
  let ref: HTMLDivElement;
  const [isHovered, setIsHovered] = createSignal(false);
  const plant = getPlantById(props.plantId);

  function waterPlant() {
    if (plant.soil_moisture !== 0) return;
    if (playerStore.selectedSpellId !== getSpellByName("Water Plant").id) {
      return;
    }
    editPlant({ ...plant, water: 600 }); // add water
    animateCount(plant);
  }

  const soilStyle: () => JSX.CSSProperties = () => {
    return {
      "--border":
        isHovered() && plant.soil_moisture === 0 ? "1px solid black" : "none",
      // "--cursor": plant.soil_moisture === 0 ? "pointer" : "not-allowed",
      "--soil-color": `hsl(27deg, 63%, ${65 - plant.soil_moisture * 20}%)`,
    };
  };

  return (
    <div class={styles.soil} style={soilStyle()}>
      {/* hitbox */}
      <div
        ref={(r) => (ref = r)}
        class={styles.hitbox}
        onClick={waterPlant}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></div>
      {/* plant */}
      <Plant plant={plant} />
      {/* water animation */}
      {plant.water > 0 && (
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
