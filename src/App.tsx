import styles from "./App.module.css";
import Pond from "./components/Pond";
import Plant from "./components/Plant";

export default function App() {
  return (
    <div class={styles.App}>
      {/* <Pond /> */}
      <Plant count={10000} />
    </div>
  );
}
