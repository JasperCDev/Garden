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

  createEffect(() => console.log(props.plant));
  return (
    <div
      class={styles.soil}
      style={{ "--border": isHovered() ? "1px solid black" : "none" }}
    >
      {/* hitbox */}
      <div class={styles.hitbox} onClick={waterPlant}></div>
      <Plant plant={props.plant} />
    </div>
  );
}
