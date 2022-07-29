import Plant from "./Plant";
import { editPlant, PlantObject } from "../stores/plants.store";
import { animateCount } from "../util/animateCount";
import styles from "./PlantContainer.module.scss";

interface Props {
  plant: PlantObject;
}

export default function PlantContainer(props: Props) {
  function waterPlant() {
    if (props.plant.water !== 0) return;
    editPlant({ ...props.plant, water: 300 }); // add water
    animateCount(props.plant);
  }

  return (
    <div class={styles.soil}>
      {/* hitbox */}
      <div class={styles.hitbox} onClick={waterPlant}></div>
      <Plant plant={props.plant} />
    </div>
  );
}
