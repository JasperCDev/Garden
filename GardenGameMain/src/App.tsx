import styles from "./App.module.css";
import FarmLand from "./components/farmLand";
import GameUI from "./components/GameUI/GameUI";
import DayNightTint from "./components/DayNightTint";
import { JSX, onMount } from "solid-js";
import Sword from "./components/Sword";
import {
  gameStore,
  pauseGame,
  resumeGame,
  setSelectedSpell,
} from "./stores/gameStore";
import GameStore from "./stores/gameStore/store.types";
import { runGlobalAnimations } from "./animations/animate";

declare global {
  interface Window {
    initialSaveData: GameStore;
  }
}

export default function App() {
  const appStyles: () => JSX.CSSProperties = () => {
    switch (gameStore.player.selectedSpellId) {
      case 1:
        return { "--cursor": "url(dirt.svg), auto" };
      case 2:
        return {
          "--cursor": "url(plant.svg), auto",
        };
      case 3:
        return { "--cursor": "url(droplet-solid.svg), auto" };
      case 4:
        return { "--cursor": "url(kill.svg), auto" };
      default:
        return { "--cursor": "auto" };
    }
  };

  onMount(() => {
    function handleNumKeyPress(numKey: number) {
      if (numKey < 1 || numKey > 9) return;

      setSelectedSpell(numKey);
    }
    window.addEventListener("keypress", (e) => {
      const numKey = Number(e.key);
      if (!Number.isNaN(numKey)) handleNumKeyPress(numKey);

      if (e.key === "p") {
        gameStore.paused ? resumeGame() : pauseGame();
      }
    });

    runGlobalAnimations();
  });

  return (
    <div class={styles.App} style={appStyles()}>
      <Sword />
      <GameUI />
      <DayNightTint />
      <FarmLand />
    </div>
  );
}
