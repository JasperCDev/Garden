import styles from "./App.module.css";
import Plant from "./components/Plant";
import { plants } from "./stores/plants.store";
import { For } from "solid-js";
import Rain from "./components/Rain";
import Pond from "./components/Pond";
import FarmLand from "./components/farmLand";

export default function App() {
  return (
    <div class={styles.App}>
      {/* <Pond /> */}
      {/* <Plant count={3000} /> */}
      {/* <Rain /> */}
      <FarmLand />
    </div>
  );
}
