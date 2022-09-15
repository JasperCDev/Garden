import styles from "./App.module.css";
import Plant from "./components/Plant";
import { plants } from "./stores/plants.store";
import { For } from "solid-js";
import Rain from "./components/Rain";
import Pond from "./components/Pond";
import FarmLand from "./components/farmLand";
import { worldStore } from "./stores/world.store";

export default function App() {
  return (
    <div class={styles.App}>
      <h1 style={{ position: "absolute", top: 0 }}>
        time: {Math.round(worldStore.time.dayTime / 1000)}:00 day:{" "}
        {worldStore.time.day}
      </h1>
      {/* <Pond /> */}
      {/* <Plant count={3000} /> */}
      {/* <Rain /> */}
      <FarmLand />
    </div>
  );
}
