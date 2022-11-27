import { PlantObject, addAnimation, gameStore } from "stores/gameStore";
import { PLANT_LEVELS } from "stores/gameStore/constants";

export function animateLevelUpPlant(plant: PlantObject, targetLevel: number) {
  addAnimation({
    id: gameStore.animations.latestId + 1,
    name: "level up plant",
    progress: 0,
    start: plant.life,
    end: PLANT_LEVELS[targetLevel].requirement,
    range: PLANT_LEVELS[targetLevel].requirement - plant.life,
    duration: 5000,
    previousTimeStamp: null,
    payload: {
      plantId: plant.id,
    },
  });
}

export function createSoilAnimation(plant: PlantObject) {
  addAnimation({
    id: gameStore.animations.latestId + 1,
    name: "animate soil",
    progress: 0,
    start: 0,
    end: 1,
    range: 1,
    duration: 10000,
    previousTimeStamp: null,
    payload: {
      waterStart: 600,
      plantId: plant.id,
    },
  });
}
