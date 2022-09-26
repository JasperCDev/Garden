import styles from "./App.module.css";
import FarmLand from "./components/farmLand";
import GameUI from "./components/GameUI/GameUI";
import DayNightTint from "./components/DayNightTint";
import { JSX, onMount } from "solid-js";
import Sword from "./components/Sword";
import { gameStore, setSelectedSpell, tickWorldTime } from "./stores/gameStore";

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
    setInterval(tickWorldTime, 1000);
    window.addEventListener("keypress", (e) => {
      const numKey = Number(e.key);
      if (Number.isNaN(numKey)) return;
      if (numKey < 1 || numKey > 9) return;

      setSelectedSpell(Number(e.key));
    });
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
