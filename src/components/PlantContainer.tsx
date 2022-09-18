import Plant from "./Plant";
import { editPlant, PlantObject, plants } from "../stores/plants.store";
import { animateCount } from "../util/animateCount";
import styles from "./PlantContainer.module.scss";
import { createEffect, createSignal, onMount, Ref } from "solid-js";
import Rain from "./Rain";
import { getSpellByName, playerStore } from "../stores/player.store";

interface Props {
  plant: PlantObject;
}

export default function PlantContainer(props: Props) {
  let ref: HTMLDivElement;
  const [rect, setRect] = createSignal<DOMRect>();
  const [isHovered, setIsHovered] = createSignal(false);

  function waterPlant() {
    if (props.plant.soil_moisture !== 0) return;
    if (playerStore.selectedSpellId !== getSpellByName("Water Plant").id) {
      return;
    }
    editPlant({ ...props.plant, water: 600 }); // add water
    animateCount(props.plant);
  }

  setTimeout(() => setRect(ref.getBoundingClientRect()), 0);

  window.addEventListener("resize", () => {
    setRect(ref.getBoundingClientRect());
  });

  return (
    <div
      class={styles.soil}
      style={{
        "--border":
          isHovered() && props.plant.soil_moisture === 0
            ? "1px solid black"
            : "none",
        // "--cursor": props.plant.soil_moisture === 0 ? "pointer" : "not-allowed",
        "--soil-color": `hsl(27deg, 63%, ${
          65 - props.plant.soil_moisture * 20
        }%)`,
      }}
    >
      {/* hitbox */}
      <div
        ref={(r) => (ref = r)}
        class={styles.hitbox}
        onClick={waterPlant}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></div>
      {/* plant */}
      <Plant plant={props.plant} />
      {/* water animation */}
      {props.plant.water > 0 && (
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
