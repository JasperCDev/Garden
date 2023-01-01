import {
  PlantObject,
  addAnimation,
  gameStore,
  TileObject,
} from "@/stores/gameStore";
import { PLANT_LEVELS } from "@/stores/gameStore/constants";

export function animateLevelUpPlant(plant: PlantObject, targetLevel: number) {
  const duration = 5000;
  addAnimation({
    id: gameStore.animations.latestId + 1,
    name: "level up plant",
    progress: 0,
    start: plant.life,
    end: PLANT_LEVELS[targetLevel].requirement,
    range: PLANT_LEVELS[targetLevel].requirement - plant.life,
    duration,
    frameCount: 0,
    frameDuration: Math.floor(duration / 16.67),
    payload: {
      plantId: plant.id,
    },
  });
}

export function createSoilAnimation(plant: PlantObject) {
  const duration = 10000;
  addAnimation({
    id: gameStore.animations.latestId + 1,
    name: "animate soil",
    progress: 0,
    start: 0,
    end: 1,
    range: 1,
    duration: duration,
    frameCount: 0,
    frameDuration: Math.floor(duration / 16.67),
    payload: {
      waterStart: 600,
      plantId: plant.id,
    },
  });
}

const track: any = new Array(49)
  .fill(null)
  .map((_, indx) => ({ [indx + 1]: 0 }))
  .reduce((a, b) => ({ ...a, ...b }), {});

export function createPlantParticleAnimation(
  row: number,
  tileId: number,
  particleId: number
) {
  track[tileId]++;
  console.log("this should be unique: ", tileId);
  const duration = 3000;
  addAnimation({
    id: gameStore.animations.latestId + 1,
    name: "plant particle",
    progress: 0,
    start: 0,
    end: 1,
    range: 1,
    duration,
    frameCount: 0,
    frameDuration: Math.floor(duration / 16.67),
    payload: {
      tileId,
      particleId,
    },
  });
}
