import FarmLand from "./farmLand";
import GameUI from "./GameUI/GameUI";
import DayNightTint from "./DayNightTint";
import Sword from "./Sword";

export default function GardenWorld() {
  return (
    <>
      <Sword />
      <GameUI />
      <DayNightTint />
      <FarmLand />
    </>
  );
}
