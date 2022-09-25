import { onMount } from "solid-js";
import { setFishStore } from "../stores/fish.store";
import styles from "./Fish.module.css";

interface Props {}

export default function Fish(props: Props) {
  const fish = (
    <svg
      width="158"
      height="51"
      viewBox="0 0 158 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class={styles.fish}
    >
      <path
        class={styles.fin}
        d="M43 25.5L10.75 3.41635L10.75 47.5836L43 25.5Z"
        fill="#FFB69E"
      />
      <ellipse
        rx="62.5"
        ry="18.5"
        transform="matrix(1 0 0 -1 95.5 25.5)"
        fill="#FFB69E"
      />
    </svg>
  ) as HTMLDivElement;

  // initialize fish ref
  setFishStore({ fish });

  onMount(() => {
    // init fish pos
    const { x, y } = fish.getBoundingClientRect();
    setFishStore({ fishStartingPos: { x, y } });
  });

  return fish;
}
