import { gameStore } from "../../stores/gameStore";
import { formatTime, getTimeFromFrameCount } from "../../util";

export default function TimeComponent() {
  const time = () => gameStore.world.time;
  return (
    <h1
      style={{
        position: "absolute",
        top: 0,
        padding: "1vw",
        "background-color": "lightcoral",
      }}
    >
      {formatTime(time())}
    </h1>
  );
}
