import Currency from "./Currency";
import TimeComponent from "./TimeComponent";

export default function GameUI() {
  return (
    <div style={{ "z-index": 9999 }}>
      <TimeComponent />
      <Currency />
    </div>
  );
}
