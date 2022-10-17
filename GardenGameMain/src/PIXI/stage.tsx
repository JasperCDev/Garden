import * as PIXI from "pixi.js";
import { Application } from "@pixi/app";
import { JSXElement, onMount } from "solid-js";
import { gameStore, initPIXI } from "../stores/gameStore";

interface Props {
  children: JSXElement | Array<JSXElement>;
}

export default function Stage(props: Props) {
  const canvas = <canvas>{gameStore.pixiApp ? props.children : null}</canvas>; // only load children after pixiApp has been initialized in store
  onMount(() => {
    const app = new Application({
      resizeTo: window,
      view: canvas as HTMLCanvasElement,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    });
    initPIXI(app);
  });
  return canvas;
}
