import { createSignal, JSX } from "solid-js";
import { fishStore, setFishStore } from "../stores/fish.store";
import { swimToFood } from "../util";
import Fish from "./Fish";
import styles from "./Pond.module.css";

export default function Pond() {
  const [isSwimming, setIsSwimming] = createSignal(false);
  const handlePondClick: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> = (
    e
  ) => {
    if (isSwimming()) return;
    setIsSwimming(true);

    /* add fish food */
    const fishFoodCopy = fishStore.fishFood.slice(0);
    fishFoodCopy.push({ x: e.x, y: e.y });
    setFishStore({ fishFood: fishFoodCopy });
    /* ------------- */

    swimToFood(
      fishStore.fish!,
      fishStore.fishStartingPos!,
      { x: e.x, y: e.y },
      () => setIsSwimming(false)
    );
  };

  return (
    <div class={styles.pond} onclick={handlePondClick}>
      <Fish />
    </div>
  );
}
