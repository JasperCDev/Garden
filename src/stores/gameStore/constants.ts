import { PlantObject, Spell } from ".";

export const ALL_SPELLS: Array<Spell> = [
  {
    id: 1,
    name: "Create Soil",
    cost: 30,
  },
  {
    id: 2,
    name: "Create Plant",
    cost: 100,
  },
  {
    id: 3,
    name: "Water Plant",
    cost: 30,
  },
  {
    id: 4,
    name: "SACRIFICE",
    cost: 0,
  },
  {
    id: 5,
    name: "Create Pond",
    cost: 100,
  },
  {
    id: 6,
    name: "Spawn Fish",
    cost: 1000,
  },
  {
    id: 7,
    name: "Feed Fish",
    cost: 50,
  },
  {
    id: 8,
    name: "Lightning",
    cost: 5000,
  },
  {
    id: 9,
    name: "Fire",
    cost: 5000,
  },
];

export const PLANT_LEVELS: {
  [key: number]: { yield: number; requirement: number };
} = {
  1: {
    requirement: 300,
    yield: 300 * 0.2,
  },
  2: {
    requirement: 1500,
    yield: 1500 * 0.2,
  },
  3: {
    requirement: 4000,
    yield: 4000 * 0.2,
  },
};
