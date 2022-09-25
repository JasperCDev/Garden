import { gameStore } from "../../stores/gameStore";
import { formatHour } from "../../util";

export default function TimeComponent() {
  return (
    <h1
      style={{
        position: "absolute",
        top: 0,
        padding: "1vw",
        "background-color": "lightcoral",
      }}
    >
      {formatHour(gameStore.world.time.hour)} day: {gameStore.world.time.day}
    </h1>
  );
}
