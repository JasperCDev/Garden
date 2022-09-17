import Currency from "./Currency";
import SpellBar from "./SpellBar";
import TimeComponent from "./TimeComponent";

export default function GameUI() {
  return (
    <div style={{ "z-index": 9999 }}>
      <TimeComponent />
      <SpellBar />
      <Currency />
    </div>
  );
}
