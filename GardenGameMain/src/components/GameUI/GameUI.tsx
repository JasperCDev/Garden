import Currency from "./Currency";
import SpellBar from "./SpellBar";
import TimeComponent from "./TimeComponent";
import styles from "./GameUI.module.scss";

export default function GameUI() {
  return (
    <div class={styles.gameUI}>
      <TimeComponent />
      <SpellBar />
      <Currency />
    </div>
  );
}
