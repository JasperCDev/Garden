import { gameStore } from "../../stores/gameStore";
import styles from "./Currency.module.scss";

export default function Currency() {
  return <div class={styles.currency}>{gameStore.player.currency.value}</div>;
}
