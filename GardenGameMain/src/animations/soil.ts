import { editPlant, PlantObject } from "../stores/gameStore";

export function animateSoil(plant: PlantObject) {
  let range = plant.water;
  let waterStart = plant.water;
  let water = waterStart;

  let startTime: number;
  const animationLength = 1000 * 3; // 3 seconds

  const animate: FrameRequestCallback = (currentTime) => {
    if (startTime === undefined) {
      startTime = currentTime;
    }

    const timePassed = currentTime - startTime;

    let progress = Math.min(timePassed / animationLength, 1);

    const diff = progress * range;

    water = Math.max(waterStart - diff, 0);

    editPlant({
      ...plant,
      water,
      soil_moisture: progress,
    });

    if (progress !== 1) {
      return requestAnimationFrame(animate);
    }

    return fadeOutSoil(plant);
  };

  requestAnimationFrame(animate);
}

function fadeOutSoil(plant: PlantObject) {
  let startTime: number;
  const animationLength = 1000; // 2 minutes

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
