import styles from "./App.module.css";
import Plant from "./components/Plant";
import { plants } from "./stores/plants.store";
import { createEffect, createSignal, JSX } from "solid-js";
import Rain from "./components/Rain";
import Pond from "./components/Pond";
import FarmLand from "./components/farmLand";
import { worldStore } from "./stores/world.store";

export default function App() {
  const dayNightStyles: () => JSX.CSSProperties = () => ({
    "background-color": worldStore.tint.color,
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100vh",
    width: "100vw",
    "z-index": 999,
    opacity: worldStore.tint.opacity,
    transition: "background-color 5s, opacity 5s",
  });

  return (
    <div class={styles.App}>
      <div style={dayNightStyles()}></div>
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
