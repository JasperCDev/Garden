import { addNewPlant, editTile, getSpellByName, getTileById } from ".";
import {
  TileType,
  TileObject,
  PlantObject,
  killPlant,
  editPlant,
  setGameStore,
  addCurrency,
  gameStore,
  Spell,
  SpellName,
} from "..";
import { animateLevelUpPlant } from "../../../animations";
import { createSoilAnimation } from "../../../animations";
import { PLANT_LEVELS } from "../constants";

function castSpell(spellName: SpellName, cb: (spell: Spell) => void) {
  const spell = getSpellByName(spellName)!;
  const playerMoney = gameStore.player.currency.value;
  if (playerMoney < spell.cost) return;
  cb(spell);
  addCurrency(-spell.cost);
}

export function castCreateSoil(id: number) {
  function cast() {
    editTile(id, { type: "soil" });
  }
  castSpell("Create Soil", cast);
}

export function castCreatePlant(tileId: number) {
  const tile = getTileById(tileId);
  if (tile?.plantId !== -1) return;
  function cast() {
    const id = gameStore.plants.lastPlantId + 1;
    const newPlant: PlantObject = {
      water: 0,
      life: 600,
      soil_moisture: 0,
      color: "lightgreen",
      cor: [0, 0],
      id,
      level: 1,
      yield: PLANT_LEVELS[1].yield,
      xp: 600,
    };

    addNewPlant(newPlant); // add plant
    editTile(tileId, { plantId: id }); // add plant reference to tile
  }
  castSpell("Create Plant", cast);
}

export function castRemovePlant(tile: TileObject, plant: PlantObject) {
  function cast() {
    killPlant(tile.plantId);
    editTile(tile.id, { plantId: -1 });
    addCurrency(plant.life);
  }
  castSpell("SACRIFICE", cast);
}

export function castWaterPlant(p: PlantObject) {
  if (p.soil_moisture !== 0) return;

  function cast() {
    const nextLevel = PLANT_LEVELS[p.level + 1];
    const shouldLevelUp = p.xp >= nextLevel?.requirement;
    if (shouldLevelUp) {
      animateLevelUpPlant(p, p.level + 1);
      editPlant({ level: p.level + 1, yield: nextLevel.yield, id: p.id });
    }
    editPlant({ water: 600, xp: p.xp + 600, id: p.id }); // add water
    createSoilAnimation(p);
  }
  castSpell("Water Plant", cast);
}
