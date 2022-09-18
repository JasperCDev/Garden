import styles from "./App.module.css";
import FarmLand from "./components/farmLand";
import GameUI from "./components/GameUI/GameUI";
import DayNightTint from "./components/DayNightTint";
import { JSX } from "solid-js";
import { getSpellById, playerStore } from "./stores/player.store";

export default function App() {
  const appStyles: () => JSX.CSSProperties = () => {
    return {
      "--cursor":
        playerStore.selectedSpellId === getSpellById(3)!.id
          ? "url(src/assets/droplet-solid.svg), auto"
          : "auto",
    };
  };
  return (
    <div class={styles.App} style={appStyles()}>
      <GameUI />
      <DayNightTint />
      <FarmLand />
    </div>
  );
}
