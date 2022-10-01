import {
  addAnimation,
  editPlant,
  gameStore,
  PlantObject,
} from "../stores/gameStore";
import { PLANT_LEVELS } from "../stores/gameStore/constants";
import animate from "./animate";

export function animateLevelUpPlant(plant: PlantObject, targetLevel: number) {
  // animate({
  //   start: plant.life,
  //   end: PLANT_LEVELS[targetLevel].requirement,
  //   animationLength: 3000,
  //   callBack: (val) => {
  //     editPlant({
  //       id: plant.id,
  //       life: val,
  //     });
  //   },
  // });
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
