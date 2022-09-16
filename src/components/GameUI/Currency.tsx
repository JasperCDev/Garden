import { worldStore } from "../../stores/world.store";

import styles from "./Currency.module.scss";

export default function Currency() {
  return <div class={styles.currency}>{worldStore.currency.value}</div>;
}
