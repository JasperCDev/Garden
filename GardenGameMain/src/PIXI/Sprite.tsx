import * as PIXI from "pixi.js";

export default function Sprite(
  set: (sprite: PIXI.Sprite) => void,
  texture?: PIXI.Texture<PIXI.Resource>
) {
  const sprite = new PIXI.Sprite(texture);
  sprite.anchor.set(0.5);
  return sprite;
}
