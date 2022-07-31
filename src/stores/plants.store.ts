import { createStore, produce } from "solid-js/store";

export interface PlantObject {
  water: number;
  life: number;
  id: number;
  soil_moisture: number;
  color: string;
}

export type Plants = Array<PlantObject>;

type Store = Plants;

const initialState: Store = [
  { water: 0, life: 0, soil_moisture: 0, color: "lightgreen", id: 1 },
  { water: 0, life: 0, soil_moisture: 0, color: "yellow", id: 2 },
  { water: 0, life: 0, soil_moisture: 0, color: "cyan", id: 3 },
  { water: 0, life: 0, soil_moisture: 0, color: "purple", id: 4 },
  { water: 0, life: 0, soil_moisture: 0, color: "orange", id: 5 },
  { water: 0, life: 0, soil_moisture: 0, color: "white", id: 6 },
  { water: 0, life: 0, soil_moisture: 0, color: "aquamarine", id: 7 },
  { water: 0, life: 0, soil_moisture: 0, color: "green", id: 8 },
  { water: 0, life: 0, soil_moisture: 0, color: "teal", id: 9 },
];

export const [plants, setPlants] = createStore<Store>(initialState);

export function editPlant(newPlant: PlantObject) {
  // setTodos(todo => todo.id === id, "completed", completed => !completed);
  setPlants(
    (p) => p.id === newPlant.id,
    (t) => ({ ...t, ...newPlant })
  );
}
