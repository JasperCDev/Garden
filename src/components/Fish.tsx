import { onMount } from "solid-js";
import { setFishStore } from "../stores/fish.store";
import styles from "./Fish.module.css";

interface Props {}

export default function Fish(props: Props) {
  const fish = (<div class={styles.fish}></div>) as HTMLDivElement;

  // initialize fish ref
  setFishStore({ fish });

  onMount(() => {
    // init fish pos
    const { x, y } = fish.getBoundingClientRect();
    setFishStore({ fishStartingPos: { x, y } });
  });

  return fish;
}
