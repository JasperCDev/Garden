import styles from "./App.module.css";
import Pond from "./components/Pond";

export default function App() {
  return (
    <div class={styles.App}>
      <Pond />
    </div>
  );
}
