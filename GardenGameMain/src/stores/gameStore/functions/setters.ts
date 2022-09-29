import { gameStore, PlantObject, setGameStore } from "..";
import { colors } from "../../../styles";
import { formatHour } from "../../../util";
import { PLANT_LEVELS } from "../constants";

function editGameStore(cb: () => void) {
  cb();
  window.initialSaveData = gameStore;
}

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

export function addNewPlant(newPlant: PlantObject) {
  function addNewPlantCB() {
    //add plant
    setGameStore("plants", "list", (p) => [...p, newPlant]);

    // increment latest id
    setGameStore("plants", "lastPlantId", (id) => newPlant.id);
  }
  editGameStore(addNewPlantCB);
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

export function setSelectedSpell(id: number) {
  function setSelectedSpellCB() {
    setGameStore("player", "selectedSpellId", id);
  }
  editGameStore(setSelectedSpellCB);
}

export function setNewTime(newTime: typeof gameStore.world.time) {
  function setNewTimeCB() {
    setGameStore("world", "time", (t) => newTime);
  }
  editGameStore(setNewTimeCB);
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
