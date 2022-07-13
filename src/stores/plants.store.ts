import { createStore } from "solid-js/store";

interface Plant {
  count: number;
  soilMoisture: number;
}

type Plants = Array<Plant>;

interface Store {
  plants: Plants;
}

const initialState: Store = {
  plants: [
    { count: 1000, soilMoisture: 0 },
    { count: 2000, soilMoisture: 0 },
    { count: 3000, soilMoisture: 0 },
    { count: 4000, soilMoisture: 0 },
  ],
};

export const [plants, setPlants] = createStore<Store>(initialState);
