import { gameStore } from "@/stores/gameStore";
import { formatTime } from "@/utils";
import styles from "./TimeComponent.module.scss";

export default function TimeComponent() {
  const time = () => gameStore.world.time;
  return <h1 class={styles.timeComponent}>{formatTime(time())}</h1>;
}
