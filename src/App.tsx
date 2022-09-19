import styles from "./App.module.css";
import FarmLand from "./components/farmLand";
import GameUI from "./components/GameUI/GameUI";
import DayNightTint from "./components/DayNightTint";
import { JSX } from "solid-js";
import { getSpellById, playerStore } from "./stores/player.store";
import Sword from "./components/Sword";

export default function App() {
  const appStyles: () => JSX.CSSProperties = () => {
    switch (playerStore.selectedSpellId) {
      case 1:
        return { "--cursor": "url(src/assets/dirt.svg), auto" };
      case 2:
        return { "--cursor": "url(src/assets/plant.svg), auto" };
      case 3:
        return { "--cursor": "url(src/assets/droplet-solid.svg), auto" };
      case 4:
        return { "--cursor": "url(src/assets/kill.svg), auto" };
      default:
        return { "--cursor": "auto" };
    }
  };

  return (
    <div class={styles.App} style={appStyles()}>
      <Sword />
      <GameUI />
      <DayNightTint />
      <FarmLand />
    </div>
  );
}
