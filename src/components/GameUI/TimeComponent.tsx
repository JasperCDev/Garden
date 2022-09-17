import { worldStore } from "../../stores/world.store";

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
      time: {Math.round(worldStore.time.dayTime / 1000)}:00 day:{" "}
      {worldStore.time.day}
    </h1>
  );
}
