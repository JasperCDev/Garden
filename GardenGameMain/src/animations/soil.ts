import { editPlant, PlantObject } from "../stores/gameStore";
import animate from "./animate";

export function animateSoil(plant: PlantObject) {
  const waterStart = plant.water;

  animate({
    animationLength: 3000,
    start: 0,
    end: 1,
    callBack: (val, progress) => {
      console.log(val);
      editPlant({
        ...plant,
        water: waterStart - waterStart * progress,
        soil_moisture: val,
      });
    },
    onAnimationEnd: () => fadeOutSoil(plant),
  });
}

function fadeOutSoil(plant: PlantObject) {
  animate({
    start: 0,
    end: 1,
    animationLength: 1000,
    callBack: (val, progress) => {
      editPlant({ ...plant, soil_moisture: 1 - progress });
    },
  });
}
