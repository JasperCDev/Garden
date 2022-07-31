import Plant from "./Plant";
import { editPlant, PlantObject } from "../stores/plants.store";
import { animateCount } from "../util/animateCount";
import styles from "./PlantContainer.module.scss";
import { createEffect, createSignal } from "solid-js";

interface Props {
  plant: PlantObject;
}

export default function PlantContainer(props: Props) {
  const [isHovered, setIsHovered] = createSignal(false);

  function waterPlant() {
    if (props.plant.water !== 0) return;
    editPlant({ ...props.plant, water: 600 }); // add water
    animateCount(props.plant);
  }

  return (
    <div
      class={styles.soil}
      style={{
        "--outline": isHovered() ? "0.2vw solid black" : "none",
        "--cursor": props.plant.soil_moisture === 0 ? "pointer" : "auto",
        "--soil-color": `hsl(27deg, 63%, ${
          65 - props.plant.soil_moisture * 20
        }%)`,
      }}
    >
      {/* hitbox */}
      <div
        class={styles.hitbox}
        onClick={waterPlant}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></div>
      <Plant plant={props.plant} />
    </div>
  );
}
