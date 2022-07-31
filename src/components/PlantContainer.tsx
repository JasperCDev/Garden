import Plant from "./Plant";
import { editPlant, PlantObject, plants } from "../stores/plants.store";
import { animateCount } from "../util/animateCount";
import styles from "./PlantContainer.module.scss";
import { createEffect, createSignal, onMount, Ref } from "solid-js";
import Rain from "./Rain";

interface Props {
  plant: PlantObject;
}

export default function PlantContainer(props: Props) {
  let ref: HTMLDivElement;
  const [rect, setRect] = createSignal<DOMRect>();
  const [top, setTop] = createSignal(0);
  const [left, setLeft] = createSignal(0);
  const [isHovered, setIsHovered] = createSignal(false);

  function waterPlant() {
    if (props.plant.soil_moisture !== 0) return;
    editPlant({ ...props.plant, water: 600 }); // add water
    animateCount(props.plant);
  }

  setTimeout(() => setRect(ref.getBoundingClientRect()), 0);

  window.addEventListener("resize", () => {
    setRect(ref.getBoundingClientRect());
  });
  createEffect(() => {
    if (rect()) {
      setTop(rect()!.top);
      setLeft(rect()!.left);
    }
  });

  return (
    <div
      class={styles.soil}
      style={{
        "--outline":
          isHovered() && props.plant.soil_moisture === 0
            ? "0.2vw solid black"
            : "none",
        "--cursor": props.plant.soil_moisture === 0 ? "pointer" : "not-allowed",
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
      <Plant plant={props.plant} />
      {props.plant.water > 0 && (
        <Rain
          width={window.innerWidth * 0.1} // 20vw
          height={window.innerWidth * 0.1 * 2} // 20vw * 2
          top={`${top() - window.innerWidth * 0.1}px`}
          left={`${left()}px`}
        />
      )}
    </div>
  );
}
