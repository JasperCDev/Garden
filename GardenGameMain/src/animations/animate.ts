import {
  addAnimation,
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
  // const startTime = animation.startTime || currentTime;
  // const timePassed = currentTime - startTime;

  // let progress = Math.min(timePassed / animation.animationLength, 1);

  let currentTimePassed = animation.progress * animation.duration;
  let timeSinceLastFrame = currentTime - currentTimePassed;
  let timePassed = currentTimePassed + timeSinceLastFrame;
  let progress = Math.min(timePassed / animation.duration, 1);

  const diff = progress * animation.range;
  const value = animation.start + diff;

  cb(value, progress, animation);

  editAnimation(animation.id, { progress, value });

  if (progress === 1) deleteAnimation(animation.id);
}

export function runGlobalAnimations() {
  const RAFCB: FrameRequestCallback = (currentTime) => {
    console.log("ANIMATIONS LIST: ", Array.from(gameStore.animations.list));
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

function animateSoil(newVal: number, progress: number, animation: Animation) {
  const { waterStart, plantId } = animation.payload;
  console.log("ANIMATION PROGRESS: ", progress);
  editPlant({
    water: waterStart - waterStart * animation.progress,
    soil_moisture: progress,
    id: plantId,
  });
}
