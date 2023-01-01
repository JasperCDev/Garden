import { onCleanup } from "solid-js";
import {
  Animation,
  deleteAnimation,
  deletePlantParticle,
  editAnimation,
  editPlant,
  gameStore,
  incrementFrameCount,
  PlantParticleObj,
  setIsDayEnd,
  setNewTime,
  setNextTint,
  setPlantParticle,
} from "@/stores/gameStore";
import { framesInADay, getTimeFromFrameCount } from "@/utils";

type AnimationCB = (
  newVal: number,
  progress: number,
  animation: Animation
) => void;

export function runGlobalAnimations() {
  const RAFCB: FrameRequestCallback = (currentTime) => {
    if (gameStore.world.paused || gameStore.world.isDayEnd) {
      return requestAnimationFrame(RAFCB); // short circuit on pause!
    }
    // these always need to run
    incrementFrameCount();
    tickWorldTime();
    // ------------------------

    for (let i = 0; i < gameStore.animations.list.length; i++) {
      const anim = gameStore.animations.list[i];
      switch (anim.name) {
        case "animate soil":
          step(anim, animateSoil);
          break;
        case "level up plant":
          step(anim, animatePlantLevelUp);
          break;
        case "tick world time":
          step(anim, tickWorldTime);
          break;
        case "plant particle":
          step(anim, animatePlantParticle);
        default:
      }
    }
    requestAnimationFrame(RAFCB);
  };
  const handle = requestAnimationFrame(RAFCB);
  onCleanup(() => cancelAnimationFrame(handle));
}

function step(animation: Animation, cb: AnimationCB) {
  const frameCount = animation.frameCount + 1;

  if (animation.payload.tileId === 7 && animation.name === "plant particle") {
    console.log(
      "this should be going up by 1 each frame: ",
      animation.frameCount,
      frameCount
    );
  }
  const progress = frameCount / animation.frameDuration;

  const diff = progress * animation.range;
  const value = animation.start + diff;

  cb(value, progress, animation);

  editAnimation(animation.id, {
    progress,
    frameCount,
  });

  if (progress === 1) {
    deleteAnimation(animation.id);
  }
}

// animation functions ---------------------------------------------------------
const animateSoil: AnimationCB = (newVal, progress, animation) => {
  const { waterStart, plantId } = animation.payload;
  const upValue = progress * 2;
  const downValue = 2 - upValue;
  const soilMoisture = progress > 0.5 ? downValue : upValue;
  editPlant({
    water: waterStart - waterStart * animation.progress,
    soil_moisture: soilMoisture,
    id: plantId,
  });
};

const animatePlantLevelUp: AnimationCB = (newVal, progress, animation) => {
  editPlant({
    id: animation.payload.plantId,
    life: newVal,
  });
};

export const tickWorldTime = () => {
  const time = getTimeFromFrameCount(gameStore.frameCount);
  if (gameStore.frameCount % framesInADay === 0) {
    setIsDayEnd(true);
  }
  setNextTint(time.hour);
  setNewTime(time);
};

export const animatePlantParticle: AnimationCB = (
  newVal,
  progress,
  animation
) => {
  const particle: PlantParticleObj = {
    id: animation.payload.particleId,
    tileId: animation.payload.tileId,
    progress,
  };
  setPlantParticle(animation.payload.tileId, particle);
  if (progress === 1) {
    deletePlantParticle(animation.payload.particleId);
  }
};
