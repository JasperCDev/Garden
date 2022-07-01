import { createSignal, For, JSX } from "solid-js";
import { fishStore, setFishStore } from "../stores/fish.store";
import { swimToFood } from "../util";
import Fish from "./Fish";
import Food from "./Food";
import styles from "./Pond.module.css";

export default function Pond() {
  const [isSwimming, setIsSwimming] = createSignal(false);
  const handlePondClick: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> = (
    e
  ) => {
    /* add fish food */
    const fishFoodCopy = fishStore.fishFood.slice(0);
    fishFoodCopy.push({ x: e.x, y: e.y });
    setFishStore({ fishFood: fishFoodCopy });
    /* ------------- */

    eatFood();
  };

  function eatFood() {
    if (isSwimming()) return;
    setIsSwimming(true);
    console.log("here");
    const { x, y } = fishStore.fishFood[0];
    swimToFood(fishStore.fish!, fishStore.fishStartingPos!, { x, y }, () => {
      setIsSwimming(false);
      const fishFoodCopy = fishStore.fishFood.slice(0);
      fishFoodCopy.shift();
      setFishStore({ fishFood: fishFoodCopy });
      if (fishFoodCopy.length) {
        eatFood();
      }
    });
  }

  return (
    <div class={styles.pond} onclick={handlePondClick}>
      <Fish />
      <For each={fishStore.fishFood}>
        {(pos) => {
          return <Food pos={pos} />;
        }}
      </For>
    </div>
  );
}
