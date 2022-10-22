import styles from "./App.module.css";
import FarmLand from "./components/farmLand";
import GameUI from "./components/GameUI/GameUI";
import DayNightTint from "./components/DayNightTint";
import { For, onMount } from "solid-js";
import Sword from "./components/Sword";
import {
  gameStore,
  initPIXI,
  pauseGame,
  resumeGame,
  setSelectedSpell,
} from "./stores/gameStore";
import GameStore from "./stores/gameStore/store.types";
import { runGlobalAnimations } from "./animations/animate";
import Graphics from "./PIXI/Graphics";
import Sprite from "./PIXI/Sprite";
import * as PIXI from "pixi.js";
import { Container, DisplayObject } from "pixi.js";

declare global {
  interface Window {
    initialSaveData: GameStore;
    gameEvents: { pauseEvent: Event; resumeEvent: Event };
  }
}

function init() {
  const app = new PIXI.Application({
    resizeTo: window,
    view: document.getElementById("root") as HTMLCanvasElement,
    backgroundColor: 0x000000,
  });
  initPIXI(app);
}

export default function App() {
  init(); // init pixi!

  // const appStyles: () => JSX.CSSProperties = () => {
  //   let cursor = "auto";
  //   let opacity = gameStore.paused ? 0.7 : 1;
  //   switch (gameStore.player.selectedSpellId) {
  //     case 1:
  //       cursor = "url(dirt.svg), auto";
  //       break;
  //     case 2:
  //       cursor = "url(plant.svg), auto";
  //       break;
  //     case 3:
  //       cursor = "url(droplet-solid.svg), auto";
  //       break;
  //     case 4:
  //       cursor = "url(kill.svg), auto";
  //       break;
  //   }
  //   return {
  //     "--cursor": cursor,
  //     "--opacity": opacity,
  //   };
  // };

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
    <For each={gameStore.farmLand.tiles}>
      {(tile, i) => {
        return (
          <Graphics
            draw={(g) => {
              g.beginFill(0xffffff);
              g.drawCircle(i() * 10, i() * 10, 10);
              g.endFill();
            }}
          />
        );
      }}
    </For>
  );
}
