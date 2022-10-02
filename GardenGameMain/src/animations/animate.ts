import {
  Animation,
  deleteAnimation,
  editAnimation,
  editPlant,
  gameStore,
  incrementFrameCount,
  setNewTime,
  setNextCurrency,
  setNextTint,
} from "../stores/gameStore";
import { getTimeFromFrameCount } from "../util";

type AnimationCB = (
  newVal: number,
  progress: number,
  animation: Animation
) => void;

export function runGlobalAnimations() {
  // this runs on window load, we need to reset animation timeStamps if there are any
  for (let i = 0; i < gameStore.animations.list.length; i++) {
    const anim = gameStore.animations.list[i];
    editAnimation(anim.id, { previousTimeStamp: null });
  }

  const RAFCB: FrameRequestCallback = (currentTime) => {
    // these always need to run
    incrementFrameCount();
    tickWorldTime();
    // ------------------------

    for (let i = 0; i < gameStore.animations.list.length; i++) {
      const anim = gameStore.animations.list[i];
      switch (anim.name) {
        case "animate soil":
          step(currentTime, anim, animateSoil);
          break;
        case "level up plant":
          step(currentTime, anim, animatePlantLevelUp);
          break;
        case "tick world time":
          step(currentTime, anim, tickWorldTime);
          break;
        default:
      }
    }
    requestAnimationFrame(RAFCB);
  };
  requestAnimationFrame(RAFCB);
}

function step(currentTime: number, animation: Animation, cb: AnimationCB) {
  let currentTimePassed = animation.progress * animation.duration;
  let timeSinceLastFrame =
    currentTime - (animation.previousTimeStamp || currentTime);
  let timePassed = currentTimePassed + timeSinceLastFrame;
  let progress = Math.min(timePassed / animation.duration, 1);

  const diff = progress * animation.range;
  const value = animation.start + diff;

  cb(value, progress, animation);

  editAnimation(animation.id, {
    progress,
    previousTimeStamp: currentTime,
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

export function tickWorldTime() {
  const time = getTimeFromFrameCount(gameStore.frameCount);
  if (time.hour === 24) {
    setNextCurrency();
  }

  setNextTint(time.hour);
  setNewTime(time);
}
