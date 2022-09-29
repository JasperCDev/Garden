export default function animate(config: {
  start: number;
  end: number;
  animationLength: number;
  callBack: (val: number) => void;
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

    config.callBack(config.start + diff);

    if (progress !== 1) {
      return requestAnimationFrame(RAFCB);
    }
  };

  requestAnimationFrame(RAFCB);
}
