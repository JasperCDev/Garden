import { createSignal, JSX } from "solid-js";
import {
  castCreateSoil,
  gameStore,
  getSpellByName,
  TileObject,
} from "../stores/gameStore";
import Sprite from "./Sprite";
import * as PIXI from "pixi.js";

interface Props {
  tile: TileObject;
  index: number;
}

export default function Grass(props: Props) {
  const [isHovered, setIsHovered] = createSignal(false);

  const grassStyle: () => JSX.CSSProperties = () => {
    return {
      "--border": isHovered() ? "1px solid black" : "none",
    };
  };

  function handleGrassClick() {
    if (gameStore.player.selectedSpellId !== getSpellByName("Create Soil").id) {
      return;
    }
    castCreateSoil(props.tile.id);
  }

  function setSprite(s: PIXI.Sprite) {
    const n = props.index + 1;
    const row = Math.ceil(n / gameStore.farmLand.columns);
    const column = Math.ceil(n % gameStore.farmLand.columns) + 1;

    s.x = column * 50;
    s.y = row * 50;
    s.tint = 0x556b2f;
    s.width = 50;
    s.height = 50;
    s.interactive = true;
    s.on("click", () => console.log(row, column));
  }

  return <Sprite texture={PIXI.Texture.WHITE} set={setSprite} />;
}
