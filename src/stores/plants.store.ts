import { createStore, produce } from "solid-js/store";

export interface PlantObject {
  water: number;
  life: number;
  id: number;
  soil_moisture: number;
}

export type Plants = Array<PlantObject>;

type Store = Plants;

const initialState: Store = [
  { water: 0, life: 0, soil_moisture: 0, id: 1 },
  { water: 0, life: 0, soil_moisture: 0, id: 2 },
  { water: 0, life: 0, soil_moisture: 0, id: 3 },
  { water: 0, life: 0, soil_moisture: 0, id: 4 },
  { water: 0, life: 0, soil_moisture: 0, id: 5 },
  { water: 0, life: 0, soil_moisture: 0, id: 6 },
  { water: 0, life: 0, soil_moisture: 0, id: 7 },
  { water: 0, life: 0, soil_moisture: 0, id: 8 },
  { water: 0, life: 0, soil_moisture: 0, id: 9 },
];

export const [plants, setPlants] = createStore<Store>(initialState);

export function editPlant(newPlant: PlantObject) {
  // setTodos(todo => todo.id === id, "completed", completed => !completed);
  setPlants(
    (p) => p.id === newPlant.id,
    (t) => ({ ...t, ...newPlant })
  );
}
