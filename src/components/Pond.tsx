import Fish from "./Fish";
import styles from "./Pond.module.css";

export default function Pond() {
  return (
    <>
      <div class={styles.pond}>
        <Fish />
      </div>
    </>
  );
}
