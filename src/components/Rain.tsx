import { createEffect, createSignal, For, mergeProps } from "solid-js";
import styles from "./Rain.module.scss";
import Raindrop from "./Raindrop";

interface Props {
  width: number;
  height: number;
  top: string;
  left: string;
}

type Raindrops = Array<[number, number]>;

export default function Rain(props: Props) {
  const [raindrops, setRaindrops] = createSignal<Raindrops>([]);

  createEffect(() => {
    function getRaindrops() {
      const rainDropCount = Math.floor(props.width / 10);
      const rainDrops: Raindrops = [];

      for (let i = 0; i < rainDropCount; i++) {
        const randomWidth = Math.random() * props.width;
        const randomHeight =
          Math.random() * (props.height / 2) + props.height / 2;
        rainDrops.push([randomWidth, randomHeight]);
      }

      return rainDrops;
    }

    setRaindrops(getRaindrops());

    function onResize() {
      setRaindrops(getRaindrops());
    }

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  });

  return (
    <svg
      class={styles.rain}
      width={props.width}
      height={props.height}
      style={{ "--top": props.top, "--left": props.left }}
    >
      <For each={raindrops()}>
        {([randomWidth, randomHeight]) => {
          return (
            <Raindrop randomHeight={randomHeight} randomWidth={randomWidth} />
          );
        }}
      </For>
    </svg>
  );
}
