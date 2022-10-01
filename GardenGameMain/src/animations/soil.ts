import { addAnimation, gameStore, PlantObject } from "../stores/gameStore";

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
