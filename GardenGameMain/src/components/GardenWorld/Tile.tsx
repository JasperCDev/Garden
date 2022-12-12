import { TileObject } from "@/stores/gameStore";
import Grass from "./Grass";
import Soil from "./Soil";

import styles from "./Tile.module.scss";

interface Props {
  tile: TileObject;
}

export default function Tile(props: Props) {
  return (
    <div class={styles.tile}>
      {props.tile.type === "soil" && <Soil tile={props.tile} />}
      {props.tile.type === "grass" && <Grass tile={props.tile} />}
    </div>
  );
}
