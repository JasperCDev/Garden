import { JSXElement, onMount } from "solid-js";
import * as PIXI from "pixi.js";

interface Props {
  draw?: (g: PIXI.Graphics) => void;
}

export default function Graphics(props: Props) {
  const g = new PIXI.Graphics();
  if (props.draw) props.draw(g);
  return g;
}
