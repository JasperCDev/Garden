import {
  TileType,
  createPlant,
  TileObject,
  PlantObject,
  killPlant,
  editPlant,
  setGameStore,
  addCurrency,
} from "..";
import { animateCount } from "../../../util/animateCount";

export function castCreateSoil(id: number) {
  setGameStore(
    "farmLand",
    "tiles",
    (t) => t.id === id,
    (t) => ({
      ...t,
      type: "soil" as TileType,
    })
  );
  addCurrency(-30);
}

export function castCreatePlant(tileId: number) {
  const id = createPlant();
  setGameStore(
    "farmLand",
    "tiles",
    (t) => t.id === tileId,
    (t) => ({ ...t, plantId: id })
  );
  addCurrency(-500);
}

export function castRemovePlant(tile: TileObject, plant: PlantObject) {
  killPlant(tile.plantId);
  setGameStore(
    "farmLand",
    "tiles",
    (t) => t.id === tile.id,
    (t) => ({ ...t, plantId: -1 })
  );
  addCurrency(plant.life);
}

export function castWaterPlant(p: PlantObject) {
  if (p.soil_moisture !== 0) return;

  editPlant({ ...p, water: 600 }); // add water
  animateCount(p);
  addCurrency(-500);
}
