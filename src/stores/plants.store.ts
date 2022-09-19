import { createStore, produce } from "solid-js/store";

export interface PlantObject {
  water: number;
  life: number;
  id: number;
  soil_moisture: number;
  color: string;
  cor: [number, number];
}

export type Plants = Array<PlantObject>;

type Store = { plants: Plants; lastPlantId: number };

const initialState: Store = {
  plants: [
    {
      water: 0,
      life: 3000,
      soil_moisture: 0,
      color: "lightgreen",
      cor: [0, 0],
      id: 1,
    },
  ],
  lastPlantId: 1,
};

export const [plants, setPlants] = createStore<Store>(initialState);

export function editPlant(newPlant: PlantObject) {
  setPlants(
    "plants",
    (p) => p.id === newPlant.id,
    (t) => ({ ...t, ...newPlant })
  );
}

export function getPlantById(id: number): PlantObject {
  const p = plants.plants.find((p) => p.id === id);
  return p || defaultPlant;
}

export function createPlant() {
  const newId = plants.lastPlantId + 1;
  const newPlant: PlantObject = {
    water: 0,
    life: 300,
    soil_moisture: 0,
    color: "lightgreen",
    cor: [0, 0],
    id: newId,
  };
  //add plant
  setPlants("plants", (p) => [...p, newPlant]);

  // increment latest id
  setPlants("lastPlantId", (id) => newId);

  return newPlant.id;
}

// this is for typescript's sake...
export const defaultPlant: PlantObject = {
  life: 0,
  color: "",
  id: 0,
  cor: [-1, -1],
  water: 0,
  soil_moisture: 0,
};
