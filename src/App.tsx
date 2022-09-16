import styles from "./App.module.css";
import FarmLand from "./components/farmLand";
import GameUI from "./components/GameUI/GameUI";
import DayNightTint from "./components/DayNightTint";

export default function App() {
  return (
    <div class={styles.App}>
      <GameUI />
      <DayNightTint />
      <FarmLand />
    </div>
  );
}
