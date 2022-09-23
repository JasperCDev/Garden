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
      time: {gameStore.world.time.hour}:{gameStore.world.time.minute} day:{" "}
      {gameStore.world.time.day}
    </h1>
  );
}
