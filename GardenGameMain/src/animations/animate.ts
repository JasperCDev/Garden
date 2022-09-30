import {
  addAnimation,
  Animation,
  deleteAnimation,
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
  const startTime = animation.startTime || currentTime;
  const timePassed = currentTime - startTime;

  let progress = Math.min(timePassed / animation.animationLength, 1);

  const diff = progress * animation.range;

  cb(animation.start + diff, progress, animation);
}

export function runGlobalAnimations() {
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

function animateSoil(newVal: number, progress: number, animation: Animation) {
  const { waterStart, plantId } = animation.payload;
  editPlant({
    water: waterStart - waterStart * animation.progress,
    soil_moisture: animation.value,
    id: plantId,
  });
}
