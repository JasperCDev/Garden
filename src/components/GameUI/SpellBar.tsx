import { JSX } from "solid-js/jsx-runtime";

export default function SpellBar() {
  const spellBarStyles: () => JSX.CSSProperties = () => ({
    position: "absolute",
    bottom: "0px",
    padding: "2vw",
    "background-color": "lightcoral",
    width: "30vw",
  });

  return <div style={spellBarStyles()}>Spells</div>;
}
