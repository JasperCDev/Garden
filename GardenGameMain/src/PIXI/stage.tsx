import * as PIXI from "pixi.js";
import { Application } from "@pixi/app";
import { Loader } from "@pixi/loaders";
import { onMount } from "solid-js";

export default function Stage() {
  const canvas = <canvas></canvas>;
  onMount(() => {
    const app = new Application({
      width: 800,
      height: 600,
      view: canvas as HTMLCanvasElement,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    });

    const loader = new Loader();

    loader
      .add("bunny", "./GardenGameMain/public/assets/kill.svg")
      .load((loader, resources) => {
        // This creates a texture from a 'bunny.png' image.
        const bunny = new PIXI.Sprite(resources.bunny.texture);

        // Setup the position of the bunny
        bunny.x = app.renderer.width / 2;
        bunny.y = app.renderer.height / 2;

        // Rotate around the center
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        // Add the bunny to the scene we are building.
        app.stage.addChild(bunny);

        // Listen for frame updates
        app.ticker.add(() => {
          // each frame we spin the bunny around a bit
          bunny.rotation += 0.01;
        });
      });
  });
  return canvas;
}
