import { gameStore, PlantObject, setGameStore } from "..";
import { colors } from "../../../styles";
import { formatHour } from "../../../util";
import { ALL_SPELLS, PLANT_LEVELS } from "../constants";

/* --------------- PLANTS ----------------- */
export function editPlant(newPlant: PlantObject) {
  setGameStore(
    "plants",
    "list",
    (p) => p.id === newPlant.id,
    (t) => ({ ...t, ...newPlant })
  );
}

export function getPlantById(id: number): PlantObject {
  const p = gameStore.plants.list.find((p) => p.id === id);
  return p || defaultPlant;
}

export function createPlant() {
  const newId = gameStore.plants.lastPlantId + 1;
  const newPlant: PlantObject = {
    water: 0,
    life: 300,
    soil_moisture: 0,
    color: "lightgreen",
    cor: [0, 0],
    id: newId,
    level: 1,
    yield: PLANT_LEVELS[1].yield,
    xp: 300,
  };
  //add plant
  setGameStore("plants", "list", (p) => [...p, newPlant]);

  // increment latest id
  setGameStore("plants", "lastPlantId", (id) => newId);

  return newPlant.id;
}

export function killPlant(plantId: number) {
  setGameStore("plants", "list", (plants) => {
    const copy = plants.slice(0);
    copy.filter((p) => p.id !== plantId);
    return copy;
  });
}

// this is for typescript's sake...
export const defaultPlant: PlantObject = {
  life: 0,
  color: "",
  id: 0,
  cor: [-1, -1],
  water: 0,
  soil_moisture: 0,
  yield: 0,
  level: 0,
  xp: 0,
};

/* ---------------------------------------- */

/* --------------- SPELLS ----------------- */
export function getSpellById(id: number) {
  return ALL_SPELLS.find((s) => s.id === id);
}

export function getSpellByName(name: string) {
  return ALL_SPELLS.find((s) => s.name.toLowerCase() === name.toLowerCase())!;
}

export function setSelectedSpell(id: number) {
  setGameStore("player", "selectedSpellId", id);
}

/* ---------------------------------------- */

/* ---------------- WORLD ----------------- */
export function tickWorldTime() {
  setGameStore("world", "time", (t) => {
    const now = Date.now();
    let gameTime = now - t.sessionTimeStamp;
    let dayTime = now - t.dayTimeStamp;
    let dayTimeStamp = t.dayTimeStamp;
    let day = t.day;

    let dayLength = 1000 * 60 * 5; // 5 minutes

    let hourLength = dayLength / 24;
    let minuteLength = hourLength / 60;
    let hour = Math.floor(dayTime / hourLength);
    let minute = Math.floor((dayTime % hourLength) / minuteLength);
    setNextTint(hour);

    if (dayTime >= dayLength) {
      dayTime = 0.0;
      dayTimeStamp = now;
      day++;
      getNextCurrency();
    }

    return {
      ...t,
      gameTime,
      dayTime,
      dayTimeStamp,
      day,
      hour,
      minute,
    };
  });
}

export function setNextTint(hour: number) {
  const formattedHour = formatHour(hour);

  const tint = colors.tints[formattedHour];
  if (!tint) return;
  setGameStore("world", "tint", (t) => ({
    ...t,
    opacity: 0.4,
    color: tint,
  }));
}

/* ---------------------------------------- */

/* -------------- CURRENCY ---------------- */
export function addCurrency(val: number) {
  setGameStore("player", "currency", "value", (c) => {
    return Math.floor(c + val);
  });
}

export function getNextCurrency() {
  setGameStore("player", "currency", (c) => {
    const val = gameStore.plants.list.reduce((a, b) => a + b.yield, 0);
    return {
      ...c,
      value: Math.floor(val + c.value),
    };
  });
}
/* ---------------------------------------- */

/* ------------- Tiles -------------------- */

export function getTileById(id: number) {
  return gameStore.farmLand.tiles.find((t) => t.id === id);
}
