import styles from "./Food.module.css";

interface Props {
  pos: { x: number; y: number };
}

export default function Food(props: Props) {
  return (
    <div
      class={styles.food}
      style={{ top: `${props.pos.y}px`, left: `${props.pos.x}px` }}
    ></div>
  );
}
