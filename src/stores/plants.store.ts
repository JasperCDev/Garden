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

type Store = Plants;

const initialState: Store = [
  {
    water: 0,
    life: 0,
    soil_moisture: 0,
    color: "lightgreen",
    cor: [0, 0],
    id: 1,
  },
  {
    water: 0,
    life: 0,
    soil_moisture: 0,
    color: "yellow",
    cor: [1, 0],
    id: 2,
  },
  {
    water: 0,
    life: 0,
    soil_moisture: 0,
    color: "cyan",
    cor: [2, 0],
    id: 3,
  },
  {
    water: 0,
    life: 0,
    soil_moisture: 0,
    color: "purple",
    cor: [0, 1],
    id: 4,
  },
  {
    water: 0,
    life: 0,
    soil_moisture: 0,
    color: "orange",
    cor: [1, 1],
    id: 5,
  },
  {
    water: 0,
    life: 0,
    soil_moisture: 0,
    color: "white",
    cor: [2, 1],
    id: 6,
  },
  {
    water: 0,
    life: 0,
    soil_moisture: 0,
    color: "aquamarine",
    cor: [0, 2],
    id: 7,
  },
  {
    water: 0,
    life: 0,
    soil_moisture: 0,
    color: "green",
    cor: [1, 2],
    id: 8,
  },
  {
    water: 0,
    life: 0,
    soil_moisture: 0,
    color: "teal",
    cor: [2, 2],
    id: 9,
  },
];

export const [plants, setPlants] = createStore<Store>(initialState);

export function editPlant(newPlant: PlantObject) {
  setPlants(
    (p) => p.id === newPlant.id,
    (t) => ({ ...t, ...newPlant })
  );
}
