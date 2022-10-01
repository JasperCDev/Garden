import {
  Animation,
  deleteAnimation,
  editAnimation,
  editPlant,
  gameStore,
} from "../stores/gameStore";

export default function animate(config: {
  start: number;
  end: number;
  animationLength: number;
  callBack: (val: number, progress: number) => void;
  onAnimationEnd?: () => void;
}) {
  let range = config.end - config.start;

  let startTime: number;

  const RAFCB: FrameRequestCallback = (currentTime) => {
    if (startTime === undefined) {
      startTime = currentTime;
    }

    const timePassed = currentTime - startTime;

    let progress = Math.min(timePassed / config.animationLength, 1);

    const diff = progress * range;

    config.callBack(config.start + diff, progress);

    if (progress !== 1) {
      return requestAnimationFrame(RAFCB);
    }

    if (config.onAnimationEnd) config.onAnimationEnd();
  };

  requestAnimationFrame(RAFCB);
}

function step(
  currentTime: number,
  animation: Animation,
  cb: (newValue: number, progress: number, animation: Animation) => void
) {
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
    value,
    previousTimeStamp: currentTime,
  });

  if (progress === 1) {
    console.log("DELETE ANIMATION");
    deleteAnimation(animation.id);
  }
}

export function runGlobalAnimations() {
  // this runs on window load, we need to reset animation timeStamps if there are any
  for (let i = 0; i < gameStore.animations.list.length; i++) {
    const anim = gameStore.animations.list[i];
    editAnimation(anim.id, { previousTimeStamp: null });
  }

  const RAFCB: FrameRequestCallback = (currentTime) => {
    for (let i = 0; i < gameStore.animations.list.length; i++) {
      const anim = gameStore.animations.list[i];
      switch (anim.name) {
        case "animate soil":
          step(currentTime, anim, animateSoil);
      }
    }
    requestAnimationFrame(RAFCB);
  };
  requestAnimationFrame(RAFCB);
}

type AnimationCB = (
  newVal: number,
  progress: number,
  animation: Animation
) => void;

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
