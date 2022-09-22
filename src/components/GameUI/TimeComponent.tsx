import { gameStore } from "../../stores/gameStore";

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
      time: {Math.round(gameStore.world.time.dayTime / 1000)}:00 day:{" "}
      {gameStore.world.time.day}
    </h1>
  );
}
