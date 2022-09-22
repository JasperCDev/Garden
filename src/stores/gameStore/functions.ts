import { TileType, TileObject, PlantObject } from ".";
import { animateCount } from "../../util/animateCount";
import { setFarmLand } from "../farmLand.store";
import { plants, setPlants } from "../plants.store";
import { setPlayerStore } from "../player.store";
import { addCurrency } from "../world.store";
import { ALL_SPELLS } from "./constants";

export function CreateSoilTile(id: number) {
  setFarmLand(
    "tiles",
    (t) => t.id === id,
    (t) => ({
      ...t,
      type: "soil" as TileType,
    })
  );
  addCurrency(-30);
}

export function createPlantOnTile(tileId: number) {
  const id = createPlant();
  setFarmLand(
    "tiles",
    (t) => t.id === tileId,
    (t) => ({ ...t, plantId: id })
  );
  addCurrency(-500);
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

export function killPlant(plantId: number) {
  setPlants("plants", (plants) => {
    const copy = plants.slice(0);
    copy.filter((p) => p.id !== plantId);
    return copy;
  });
}

export function waterPlant(p: PlantObject) {
  if (p.soil_moisture !== 0) return;

  editPlant({ ...p, water: 600 }); // add water
  animateCount(p);
  addCurrency(-500);
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

export function getSpellById(id: number) {
  return ALL_SPELLS.find((s) => s.id === id);
}

export function getSpellByName(name: string) {
  return ALL_SPELLS.find((s) => s.name.toLowerCase() === name.toLowerCase())!;
}

export function setSelectedSpell(id: number) {
  setPlayerStore("selectedSpellId", id);
}

window.addEventListener("keypress", (e) => {
  const numKey = Number(e.key);
  if (Number.isNaN(numKey)) return;
  if (numKey < 1 || numKey > 9) return;

  setSelectedSpell(Number(e.key));
});
