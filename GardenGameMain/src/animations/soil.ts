import {
  addAnimation,
  editPlant,
  gameStore,
  PlantObject,
} from "../stores/gameStore";
import animate from "./animate";

export function createSoilAnimation(plant: PlantObject) {
  addAnimation({
    id: gameStore.animations.latestId + 1,
    name: "animate soil",
    progress: 0,
    start: 0,
    end: 1,
    range: 1,
    value: 0,
    startTime: null,
    duration: 10000,
    payload: {
      waterStart: 600,
      plantId: plant.id,
    },
  });
  // const waterStart = plant.water;
  // animate({
  //   animationLength: 3000,
  //   start: 0,
  //   end: 1,
  //   callBack: (val, progress) => {
  //     editPlant({
  //       water: waterStart - waterStart * progress,
  //       soil_moisture: val,
  //       id: plant.id,
  //     });
  //   },
  //   onAnimationEnd: () => fadeOutSoil(plant),
  // });
}

function fadeOutSoil(plant: PlantObject) {
  animate({
    start: 0,
    end: 1,
    animationLength: 1000,
    callBack: (val, progress) => {
      editPlant({ soil_moisture: 1 - progress, id: plant.id });
    },
  });
}
