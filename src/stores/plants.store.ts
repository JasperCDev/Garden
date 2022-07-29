import { createStore } from "solid-js/store";

export interface PlantObject {
  water: number;
  life: number;
  id: number;
}

export type Plants = Array<PlantObject>;

interface Store {
  plants: Plants;
}

const initialState: Store = {
  plants: [
    { water: 0, life: 0, id: 1 },
    { water: 0, life: 0, id: 2 },
    { water: 0, life: 0, id: 3 },
    { water: 0, life: 0, id: 4 },
    { water: 0, life: 0, id: 5 },
    { water: 0, life: 0, id: 6 },
    { water: 0, life: 0, id: 7 },
    { water: 0, life: 0, id: 8 },
    { water: 0, life: 0, id: 9 },
  ],
};

export const [plants, setPlants] = createStore<Store>(initialState);

export function editPlant(newPlant: PlantObject) {
  const newPlants = plants.plants.map((p) => {
    if (p.id === newPlant.id) {
      return { ...p, ...newPlant };
    }
    return p;
  });

  setPlants({ plants: newPlants });
}
