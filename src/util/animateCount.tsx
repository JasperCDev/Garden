import { editPlant, PlantObject } from "../stores/plants.store";

export function animateCount(plant: PlantObject) {
  let range = 600;

  let life = plant.life;
  let water = plant.water;

  let startTime: number;

  const callback = (currentTime: number) => {
    if (startTime === undefined) {
      startTime = currentTime;
    }

    const timePassed = currentTime - startTime;

    let progress = Math.min(timePassed / 3000, 1);

    const diff = progress * range;

    life = plant.life + diff;
    water = Math.max(plant.water - diff, 0);

    editPlant({ ...plant, water, life });

    if (progress !== 1) {
      return requestAnimationFrame(callback);
    }
  };

  // run recursive animation
  requestAnimationFrame(callback);
}
