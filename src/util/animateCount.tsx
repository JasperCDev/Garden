import { editPlant, PlantObject } from "../stores/plants.store";

export function animateCount(plant: PlantObject) {
  let range = 600;

  let lifeStart = plant.life;
  let waterStart = plant.water;

  let life = plant.life;
  let water = plant.water;

  let startTime: number;

  console.log("life: ", life);

  const callback = (currentTime: number) => {
    if (startTime === undefined) {
      startTime = currentTime;
    }

    const timePassed = currentTime - startTime;

    let progress = Math.min(timePassed / 3000, 1);

    const diff = progress * range;

    life = lifeStart + diff;
    water = Math.max(waterStart - diff, 0);

    console.log("this should always be the same: ", plant.life);
    editPlant({ ...plant, water, life });

    if (progress !== 1) {
      return requestAnimationFrame(callback);
    }
  };

  // run recursive animation
  requestAnimationFrame(callback);
}
