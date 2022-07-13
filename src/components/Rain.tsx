import { createEffect, createSignal, For } from "solid-js";
import styles from "./Rain.module.scss";
import Raindrop from "./Raindrop";

interface Props {}

type Raindrops = Array<[number, number]>;

function getRaindrops() {
  const rainDropCount = Math.floor(window.innerWidth / 50);
  const rainDrops: Raindrops = [];

  for (let i = 0; i < rainDropCount; i++) {
    const randomWidth = Math.random() * window.innerWidth;
    const randomHeight =
      Math.random() * window.innerHeight + window.innerHeight * 0.2;
    rainDrops.push([randomWidth, randomHeight]);
  }

  return rainDrops;
}

export default function Rain(props: Props) {
  const [raindrops, setRaindrops] = createSignal<Raindrops>([]);

  createEffect(() => {
    setRaindrops(getRaindrops());

    function onResize() {
      setRaindrops(getRaindrops());
    }

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  });

  return (
    <svg class={styles.rain} width="100%" height="100%">
      <For each={raindrops()}>
        {([randomWidth, randomHeight], indx) => {
          return (
            <Raindrop randomHeight={randomHeight} randomWidth={randomWidth} />
          );
        }}
      </For>
    </svg>
  );
}
