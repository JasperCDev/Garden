import { getSpellByName, getTileById } from ".";
import {
  TileType,
  createPlant,
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
import { animateLevelUpPlant } from "../../../animations/animateLevelUpPlant";
import { animateSoil } from "../../../animations/soil";
import { PLANT_LEVELS } from "../constants";

function castSpell(spellName: SpellName, cb: (spell: Spell) => void) {
  const spell = getSpellByName(spellName)!;
  const playerMoney = gameStore.player.currency.value;
  if (playerMoney < spell.cost) return;
  cb(spell);
  addCurrency(-spell.cost);
  window.initialSaveData = gameStore;
}

export function castCreateSoil(id: number) {
  function cast() {
    setGameStore(
      "farmLand",
      "tiles",
      (t) => t.id === id,
      (t) => ({
        ...t,
        type: "soil" as TileType,
      })
    );
  }
  castSpell("Create Soil", cast);
}

export function castCreatePlant(tileId: number) {
  const tile = getTileById(tileId);
  if (tile?.plantId !== -1) return;
  function cast() {
    const id = createPlant();
    setGameStore(
      "farmLand",
      "tiles",
      (t) => t.id === tileId,
      (t) => ({ ...t, plantId: id })
    );
  }
  castSpell("Create Plant", cast);
}

export function castRemovePlant(tile: TileObject, plant: PlantObject) {
  function cast() {
    killPlant(tile.plantId);
    setGameStore(
      "farmLand",
      "tiles",
      (t) => t.id === tile.id,
      (t) => ({ ...t, plantId: -1 })
    );
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
      editPlant({ ...p, level: p.level + 1, yield: nextLevel.yield });
    }
    editPlant({ ...p, water: 600, xp: p.xp + 600 }); // add water
    animateSoil(p);
  }
  castSpell("Water Plant", cast);
}
