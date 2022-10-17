import { PixelExtractOptions } from "@pixi/extract";
import {
  gameStore,
  PlantObject,
  setGameStore,
  TileObject,
  Animation,
} from "..";
import { colors } from "../../../styles";
import { formatHour } from "../../../util";
import * as PIXI from "pixi.js";

function editGameStore(cb: () => void) {
  cb();
  window.initialSaveData = gameStore;
}

export function editPlant(newPlant: Partial<PlantObject> & { id: number }) {
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

export function editTile(tileId: number, newTile: Partial<TileObject>) {
  function editTileCB() {
    editGameStore(() => {
      setGameStore(
        "farmLand",
        "tiles",
        (t) => t.id === tileId,
        (t) => ({ ...t, ...newTile })
      );
    });
  }
  editGameStore(editTileCB);
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

export function setNewTime(newTime: Partial<typeof gameStore.world.time>) {
  function setNewTimeCB() {
    setGameStore("world", "time", (t) => ({ ...t, ...newTime }));
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

export function addAnimation(newAnimation: Animation) {
  function addAnimationCB() {
    setGameStore("animations", "list", (a) => [...a, newAnimation]);
    setGameStore("animations", "latestId", (id) => id + 1); // increment latest id
  }

  editGameStore(addAnimationCB);
}

export function deleteAnimation(id: number) {
  function deleteAnimationCB() {
    setGameStore("animations", "list", (l) =>
      l.filter((anim) => anim.id !== id)
    );
  }

  editGameStore(deleteAnimationCB);
}

export function editAnimation(id: number, newAnim: Partial<Animation>) {
  function editAnimationCB() {
    setGameStore(
      "animations",
      "list",
      (l) => l.id === id,
      (anim) => ({ ...anim, ...newAnim })
    );
  }

  editGameStore(editAnimationCB);
}

export function incrementFrameCount() {
  function incrementFrameCountCB() {
    setGameStore("frameCount", (c) => c + 1);
  }

  editGameStore(incrementFrameCountCB);
}

export function pauseGame() {
  function pauseGameCB() {
    setGameStore("paused", true);
  }

  editGameStore(pauseGameCB);
}

export function resumeGame() {
  function resumeGameCB() {
    for (let i = 0; i < gameStore.animations.list.length; i++) {
      const anim = gameStore.animations.list[i];
      editAnimation(anim.id, { previousTimeStamp: null });
    }
    setGameStore("paused", false);
  }

  editGameStore(resumeGameCB);
}

export function initPIXI(app: PIXI.Application) {
  function initPIXICB() {
    setGameStore("pixiApp", app);
  }

  editGameStore(initPIXICB);
}
