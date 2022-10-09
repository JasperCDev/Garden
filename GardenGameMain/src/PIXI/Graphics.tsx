import { JSXElement, onMount } from "solid-js";
import * as PIXI from "pixi.js";

export default function Graphics() {
  const g = new PIXI.Graphics();
  // Rectangle
  g.beginFill(0xde3249);
  g.drawRect(50, 50, 100, 100);
  g.endFill();
  requestAnimationFrame(() => {
    function animate() {
      g.x += 0.6;
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  });
  return g;
}
