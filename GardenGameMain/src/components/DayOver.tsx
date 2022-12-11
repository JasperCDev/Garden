import { gameStore, setIsDayEnd, setNextCurrency } from "@/stores/gameStore";
import styles from "./DayOver.module.scss";

export default function DayOver() {
  setNextCurrency();
  const day = () => gameStore.world.time.day;
  function handleNextDay() {
    setIsDayEnd(false);
  }
  return (
    <div class={styles.dayOver}>
      <h1>Day {day()} Over</h1>
      <button onclick={handleNextDay}>NEXT DAY</button>
    </div>
  );
}
