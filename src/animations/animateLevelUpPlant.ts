import { editPlant, PlantObject } from "../stores/gameStore";
import { PLANT_LEVELS } from "../stores/gameStore/constants";

export function animateLevelUpPlant(plant: PlantObject, targetLevel: number) {
  let range = PLANT_LEVELS[targetLevel].requirement - plant.life;

  let lifeStart = plant.life;
  let life = plant.life;

  let startTime: number;
  const animationLength = 1000 * 5; // 5 seconds

  const animate: FrameRequestCallback = (currentTime) => {
    if (startTime === undefined) {
      startTime = currentTime;
    }

    const timePassed = currentTime - startTime;

    let progress = Math.min(timePassed / animationLength, 1);

    const diff = progress * range;

    life = lifeStart + diff;

    editPlant({
      ...plant,
      life,
    });

    if (progress !== 1) {
      return requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}
