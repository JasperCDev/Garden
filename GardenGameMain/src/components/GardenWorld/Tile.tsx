import { gameStore, TileObject } from "@/stores/gameStore";
import Grass from "./Grass";
import Soil from "./Soil";
import PlantParticle from "./PlantParticle";

import styles from "./Tile.module.scss";

interface Props {
  tile: TileObject;
}

export default function Tile(props: Props) {
  const particle = () => gameStore.plantParticles[props.tile.id];
  return (
    <div class={styles.tile} id={props.tile.id.toString()}>
      {/* going to disable this for now, it's not quite working */}
      {/* {!!particle() && (
        <PlantParticle tile={props.tile} particle={particle()} />
      )} */}
      {props.tile.type === "soil" && <Soil tile={props.tile} />}
      {props.tile.type === "grass" && <Grass tile={props.tile} />}
    </div>
  );
}
