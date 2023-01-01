import styles from "./App.module.css";
import { createEffect, JSX, onMount } from "solid-js";
import {
  gameStore,
  pauseGame,
  resumeGame,
  setSelectedSpell,
} from "@/stores/gameStore";
import GameStore from "@/stores/gameStore/store.types";
import { runGlobalAnimations } from "@/animations/animate";
import OtherWorld from "@/components/OtherWorld/OtherWorld";
import GardenWorld from "@/components/GardenWorld/GardenWorld";

declare global {
  interface Window {
    initialSaveData: GameStore;
    gameEvents: { pauseEvent: Event; resumeEvent: Event };
  }
}

export default function App() {
  createEffect(() =>
    console.log(JSON.parse(JSON.stringify(gameStore.animations.list)))
  );
  const appStyles: () => JSX.CSSProperties = () => {
    function getCursor() {
      if (gameStore.world.isDayEnd) return "auto";
      switch (gameStore.player.selectedSpellId) {
        case 1:
          return "url(dirt.svg), auto";
        case 2:
          return "url(plant.svg), auto";
        case 3:
          return "url(droplet-solid.svg), auto";
        case 4:
          return "url(kill.svg), auto";
        default:
          return "auto";
      }
    }
    let cursor = getCursor();
    let opacity = gameStore.world.paused ? 0.7 : 1;
    return {
      "--cursor": cursor,
      "--opacity": opacity,
    };
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
        if (gameStore.world.paused) {
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
      {gameStore.world.isDayEnd ? <OtherWorld /> : <GardenWorld />}
    </div>
  );
}
