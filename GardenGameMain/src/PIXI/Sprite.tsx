import * as PIXI from "pixi.js";

interface Props {
  set?: (sprite: PIXI.Sprite) => void;
  texture?: PIXI.Texture<PIXI.Resource>;
}

export default function Sprite(props: Props) {
  const sprite = new PIXI.Sprite(props.texture);
  sprite.anchor.set(0.5);
  if (props.set) props.set(sprite);
  return sprite;
}
