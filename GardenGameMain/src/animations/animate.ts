import {
  Animation,
  deleteAnimation,
  editAnimation,
  editPlant,
  gameStore,
  setNewTime,
  setNextCurrency,
  setNextTint,
} from "../stores/gameStore";

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
    console.log(
      "this should never be more than one: ",
      gameStore.animations.list.length
    );
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
          console.log("this should run once per second");
          step(currentTime, anim, tickWorldTime);
          break;
        default:
          console.log("ok what the heck");
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
  const currentTime = gameStore.world.time;

  let day = currentTime.day;
  let hour = currentTime.hour;
  let minute = currentTime.minute + 15;

  if (minute === 60) {
    minute = 0;
    hour++;
  }
  if (hour === 25) {
    day++;
    hour = 0;
    minute = 0;
    setNextCurrency();
  }

  setNextTint(hour);
  setNewTime({ day, hour, minute });
}
