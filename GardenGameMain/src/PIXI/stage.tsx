import * as PIXI from "pixi.js";
import { Application } from "@pixi/app";
import { Loader } from "@pixi/loaders";
import { JSXElement, onMount } from "solid-js";

interface Props {
  children: PIXI.DisplayObject;
}

export default function Stage(props: Props) {
  const canvas = <canvas></canvas>;
  onMount(() => {
    const app = new Application({
      width: 800,
      height: 600,
      view: canvas as HTMLCanvasElement,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    });

    app.stage.addChild(props.children as unknown as PIXI.DisplayObject);
  });
  return canvas;
}
