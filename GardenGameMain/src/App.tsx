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
    gameEvents: { pauseEvent: Event; resumeEvent: Event };
  }
}

export default function App() {
  const appStyles: () => JSX.CSSProperties = () => {
    let cursor = "auto";
    let opacity = gameStore.paused ? 0.7 : 1;
    const styles = {
      "--cursor": cursor,
      "--opacity": opacity,
    };
    switch (gameStore.player.selectedSpellId) {
      case 1:
        cursor = "url(dirt.svg), auto";
        break;
      case 2:
        cursor = "url(plant.svg), auto";
        break;
      case 3:
        cursor = "url(droplet-solid.svg), auto";
        break;
      case 4:
        cursor = "url(kill.svg), auto";
        break;
    }
    return styles;
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
        if (gameStore.paused) {
          resumeGame();
          window.dispatchEvent(window.gameEvents.resumeEvent);
        } else {
          pauseGame();
          window.dispatchEvent(window.gameEvents.pauseEvent);
        }
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
