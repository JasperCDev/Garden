import { JSX } from "solid-js/jsx-runtime";
import { gameStore } from "stores/gameStore";

export default function DayNightTint() {
  const dayNightStyles: () => JSX.CSSProperties = () => ({
    "background-color": gameStore.world.tint.color,
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100vh",
    width: "100vw",
    "z-index": 999,
    opacity: gameStore.world.tint.opacity,
    transition: "background-color 5s, opacity 5s",
  });
  return <div style={dayNightStyles()}></div>;
}
