import { gameStore, setIsDayEnd, setIsDayStart } from "@/stores/gameStore";
import styles from "./OtherWorld.module.scss";

export default function OtherWorld() {
  const day = () => gameStore.world.time.day;
  function handleNextDay() {
    setIsDayStart(true);
    setIsDayEnd(false);
  }
  return (
    <div class={styles.otherWorld}>
      <h1>Day {day()} Over</h1>
      <button onClick={handleNextDay}>NEXT DAY</button>
    </div>
  );
}
