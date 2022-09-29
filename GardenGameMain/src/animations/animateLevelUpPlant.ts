import { editPlant, PlantObject } from "../stores/gameStore";
import { PLANT_LEVELS } from "../stores/gameStore/constants";
import animate from "./animate";

export function animateLevelUpPlant(plant: PlantObject, targetLevel: number) {
  animate({
    start: plant.life,
    end: PLANT_LEVELS[targetLevel].requirement,
    animationLength: 3000,
    callBack: (val) => {
      editPlant({
        ...plant,
        life: val,
      });
    },
  });
}
