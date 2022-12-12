import { gameStore, setIsDayEnd } from "@/stores/gameStore";
import styles from "./OtherWorld.module.scss";

export default function OtherWorld() {
  const day = () => gameStore.world.time.day;
  function handleNextDay() {
    setIsDayEnd(false);
  }
  return (
    <div class={styles.otherWorld}>
      <h1>Day {day()} Over</h1>
      <button onclick={handleNextDay}>NEXT DAY</button>
    </div>
  );
}
