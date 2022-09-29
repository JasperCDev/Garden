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

/*
  function step(currentTime, animation, cb) {
    const timePassed = currentTime - startTime;

    let progress = Math.min(timePassed / config.animationLength, 1);

    const diff = progress * range;

    cb(animation.value + diff, progress);
  }

const state = {
  animations: [
    {
      name: "animate soil",
      progress: 0.56789,
      start: 0,
      end: 1,
      range: 1,
      value: number,
      startTime: null,
      animationLength: 3000,
      payload: {
        waterStart: 600,
        plantId: 1
      }
    },
    {
      name: "level up plant",
      progress: 0.299934,
      start: 600,
      end: 1500,
    }
  ]
}

function RAFCB(currentTime) {
  if (paused) {
    return;
  }
  for (let i = 0; i < state.animations.length; i++) {
    switch (animation.name) {
      case "animate soil":
        step(currentTime, animation, animateSoil);
    }
  }
}

function animateSoil(animation, newValue) {
  const { waterStart, plantId } = animation.payload;
  editPlant({
    water: waterStart - waterStart * animation.progress,
    soil_moisture: animation.value,
  });
  editAnimation({ value: newValue });
}




*/
