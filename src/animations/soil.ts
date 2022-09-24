import { editPlant, PlantObject } from "../stores/gameStore";

export function animateSoil(plant: PlantObject) {
  let range = plant.water;

  let lifeStart = plant.life;
  let waterStart = plant.water;

  // let life = plant.life;
  let water = plant.water;

  let startTime: number;
  const animationLength = 1000 * 3; // 3 seconds

  const grow: FrameRequestCallback = (currentTime) => {
    if (startTime === undefined) {
      startTime = currentTime;
    }

    const timePassed = currentTime - startTime;

    let progress = Math.min(timePassed / animationLength, 1);

    const diff = progress * range;

    // life = lifeStart + diff;
    water = Math.max(waterStart - diff, 0);

    editPlant({
      ...plant,
      water,
      // life,
      soil_moisture: progress,
    });

    if (progress !== 1) {
      return requestAnimationFrame(grow);
    }

    return fadeOutSoil(plant);
  };

  requestAnimationFrame(grow);
}

function fadeOutSoil(plant: PlantObject) {
  let startTime: number;
  const animationLength = 1000 * 60 * 2; // 2 minutes

  const callback: FrameRequestCallback = (currentTime) => {
    if (startTime === undefined) {
      startTime = currentTime;
    }

    const timePassed = currentTime - startTime;

    let progress = Math.min(timePassed / animationLength, 1);

    editPlant({ ...plant, soil_moisture: 1 - progress });

    if (progress !== 1) {
      requestAnimationFrame(callback);
    }
  };
  requestAnimationFrame(callback);
}
