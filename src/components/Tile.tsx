import { createEffect } from "solid-js";
import { TileObject } from "../stores/farmLand.store";
import { PlantObject } from "../stores/plants.store";
import Grass from "./Grass";
import Soil from "./Soil";

import styles from "./Tile.module.scss";

interface Props {
  tile: TileObject;
}

export default function Tile(props: Props) {
  // switch (props.tile.type) {
  //   case "soil":
  //     return (
  //       <div class={styles.tile}>
  //         <Soil plantId={props.tile.plantId} />
  //       </div>
  //     );
  //   default:
  //     return (
  //       <div class={styles.tile}>
  //         <Grass tile={props.tile} />
  //       </div>
  //     );
  // }
  return (
    <div class={styles.tile}>
      {props.tile.type === "soil" && <Soil plantId={props.tile.plantId} />}
      {props.tile.type === "grass" && <Grass tile={props.tile} />}
    </div>
  );
}
