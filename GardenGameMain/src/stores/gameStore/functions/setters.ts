import { gameStore, PlantObject, setGameStore } from "..";
import { colors } from "../../../styles";
import { formatHour } from "../../../util";
import { ALL_SPELLS, PLANT_LEVELS } from "../constants";

function editGameStore(cb: () => void) {
  cb();
  window.initialSaveData = gameStore;
}

/* --------------- PLANTS ----------------- */
export function editPlant(newPlant: PlantObject) {
  function editPlantCB() {
    editGameStore(() => {
      setGameStore(
        "plants",
        "list",
        (p) => p.id === newPlant.id,
        (t) => ({ ...t, ...newPlant })
      );
    });
  }
  editGameStore(editPlantCB);
}

export function getPlantById(id: number): PlantObject {
  const p = gameStore.plants.list.find((p) => p.id === id);
  return p || defaultPlant;
}

export function addNewPlant(newPlant: PlantObject) {
  function addNewPlantCB() {
    //add plant
    setGameStore("plants", "list", (p) => [...p, newPlant]);

    // increment latest id
    setGameStore("plants", "lastPlantId", (id) => newPlant.id);
  }
  editGameStore(addNewPlantCB);
}

export function createPlant() {
  const newId = gameStore.plants.lastPlantId + 1;
  const newPlant: PlantObject = {
    water: 0,
    life: 600,
    soil_moisture: 0,
    color: "lightgreen",
    cor: [0, 0],
    id: newId,
    level: 1,
    yield: PLANT_LEVELS[1].yield,
    xp: 600,
  };
  addNewPlant(newPlant);

  return newPlant.id;
}

export function killPlant(plantId: number) {
  function killPlantCB() {
    setGameStore("plants", "list", (plants) => {
      const copy = plants.slice(0);
      copy.filter((p) => p.id !== plantId);
      return copy;
    });
  }
  editGameStore(killPlantCB);
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
  function setSelectedSpellCB() {
    setGameStore("player", "selectedSpellId", id);
  }
  editGameStore(setSelectedSpellCB);
}

/* ---------------------------------------- */

/* ---------------- WORLD ----------------- */
export function setNewTime(newTime: typeof gameStore.world.time) {
  function setNewTimeCB() {
    setGameStore("world", "time", (t) => newTime);
  }
  editGameStore(setNewTimeCB);
}

export function tickWorldTime() {
  const currentTime = gameStore.world.time;
  const now = Date.now();
  let gameTime = now - currentTime.sessionTimeStamp;
  let dayTime = now - currentTime.dayTimeStamp;
  let dayTimeStamp = currentTime.dayTimeStamp;
  let day = currentTime.day;

  let dayLength = 1000 * 60; // 2 minutes

  let hourLength = dayLength / 24;
  let minuteLength = hourLength / 60;
  let hour = Math.floor(dayTime / hourLength);
  let minute = Math.floor((dayTime % hourLength) / minuteLength);
  setNextTint(hour);

  if (dayTime >= dayLength) {
    dayTime = 0.0;
    dayTimeStamp = now;
    day++;
    setNextCurrency();
  }

  const newTime = {
    ...currentTime,
    gameTime,
    dayTime,
    dayTimeStamp,
    day,
    hour,
    minute,
  };
  setNewTime(newTime);
}

export function setWorldTint(tint: string) {
  function setWorldTintCB() {
    setGameStore("world", "tint", (t) => {
      return {
        ...t,
        opacity: 0.4,
        color: tint,
      };
    });
  }
  editGameStore(setWorldTintCB);
}

export function setNextTint(hour: number) {
  const formattedHour = formatHour(hour);

  const tint = colors.tints[formattedHour];
  if (!tint) return;
  setWorldTint(tint);
}

/* ---------------------------------------- */

/* -------------- CURRENCY ---------------- */
export function addCurrency(val: number) {
  function addCurrencyCB() {
    setGameStore("player", "currency", "value", (c) => {
      return Math.floor(c + val);
    });
  }
  editGameStore(addCurrencyCB);
}

export function setNextCurrency() {
  function setNextCurrencyCB() {
    setGameStore("player", "currency", (c) => {
      const val = gameStore.plants.list.reduce((a, b) => a + b.yield, 0);
      return {
        ...c,
        value: Math.floor(val + c.value),
      };
    });
  }
  editGameStore(setNextCurrencyCB);
}
/* ---------------------------------------- */

/* ------------- Tiles -------------------- */

export function getTileById(id: number) {
  return gameStore.farmLand.tiles.find((t) => t.id === id);
}
