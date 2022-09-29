import { PlantObject, gameStore } from "..";
import { ALL_SPELLS } from "../constants";

export function getPlantById(id: number): PlantObject {
  const p = gameStore.plants.list.find((p) => p.id === id);
  return p!;
}

export function getSpellById(id: number) {
  return ALL_SPELLS.find((s) => s.id === id);
}

export function getSpellByName(name: string) {
  return ALL_SPELLS.find((s) => s.name.toLowerCase() === name.toLowerCase())!;
}

export function getTileById(id: number) {
  return gameStore.farmLand.tiles.find((t) => t.id === id);
}
