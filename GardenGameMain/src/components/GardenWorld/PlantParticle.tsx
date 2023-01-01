import { createPlantParticleAnimation } from "@/animations";
import {
  gameStore,
  PlantObject,
  PlantParticleObj,
  TileObject,
} from "@/stores/gameStore";
import { createEffect, createSignal, onMount } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import styles from "./PlantParticle.module.scss";

interface Props {
  tile: TileObject;
  particle: PlantParticleObj;
}

export default function PlantParticle(props: Props) {
  let prev = 0;
  let particleRef: HTMLDivElement | undefined;
  const [rect, setRect] = createSignal<DOMRect | null>(null);
  onMount(() => {
    setRect(particleRef!.getBoundingClientRect());
    createPlantParticleAnimation(
      props.tile.row,
      props.tile.id,
      props.particle.id
    );
  });

  const customProperties = (): JSX.CSSProperties => {
    prev = props.particle.progress;
    if (!gameStore.sword.ref || !rect()) return { "--x": "0px", "--y": "0px" };
    const {
      x: swordX,
      y: swordY,
      width: swordWidth,
      height: swordHeight,
    } = gameStore.sword.ref.getBoundingClientRect();
    const { x: particleX, y: particleY } = rect()!;

    const xDiff = -(particleX - swordX) + swordWidth / 2 - 5;
    const yDiff = -(particleY - swordY) + swordHeight / 2 - 5;
    return {
      "--x": (xDiff * props.particle.progress).toFixed(2) + "px",
      "--y": (yDiff * props.particle.progress).toFixed(2) + "px",
    };
  };
  return (
    <div
      ref={particleRef}
      class={styles.plantParticle}
      style={customProperties()}
    ></div>
  );
}
