import { JSXElement, onMount } from "solid-js";
import * as PIXI from "pixi.js";

export default function Graphics(draw?: (g: PIXI.Graphics) => void) {
  const g = new PIXI.Graphics();
  if (draw) draw(g);
  return g;
}
