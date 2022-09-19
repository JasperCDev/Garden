import { createStore } from "solid-js/store";
import { createPlant, killPlant, PlantObject } from "./plants.store";
import { addCurrency } from "./world.store";

type TileType = "soil" | "grass";

export interface TileObject {
  plantId: number;
  id: number;
  type: TileType;
}

interface Store {
  tiles: Array<TileObject>;
  columns: number;
  size: number;
}

const initialState: Store = {
  tiles: [
    {
      id: 1,
      plantId: -1,
      type: "grass",
    },
    {
      id: 2,
      plantId: -1,
      type: "grass",
    },
    {
      id: 3,
      plantId: -1,
      type: "grass",
    },
    {
      id: 4,
      plantId: -1,
      type: "grass",
    },
    {
      id: 5,
      plantId: -1,
      type: "grass",
    },
    {
      id: 6,
      plantId: -1,
      type: "grass",
    },
    {
      id: 7,
      plantId: -1,
      type: "grass",
    },
    {
      id: 8,
      plantId: -1,
      type: "grass",
    },
    {
      id: 9,
      plantId: -1,
      type: "grass",
    },
  ],
  columns: 3,
  size: 1,
};

export const [farmLand, setFarmLand] = createStore<Store>(initialState);

export function CreateSoilTile(id: number) {
  setFarmLand(
    "tiles",
    (t) => t.id === id,
    (t) => ({
      ...t,
      type: "soil" as TileType,
    })
  );
}

export function createPlantOnTile(tileId: number) {
  const id = createPlant();
  setFarmLand(
    "tiles",
    (t) => t.id === tileId,
    (t) => ({ ...t, plantId: id })
  );
}

export function removePlantFromTile(tile: TileObject, plant: PlantObject) {
  killPlant(tile.plantId);
  addCurrency(plant.life);
  setFarmLand(
    "tiles",
    (t) => t.id === tile.id,
    (t) => ({ ...t, plantId: -1 })
  );
}
