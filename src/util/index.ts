type Point = { x: number; y: number };

export function swimToFood(
  fish: HTMLDivElement,
  fishPos: Point,
  fishFood: Point,
  onEnd: () => void
) {
  const { x: fishX, y: fishY } = fishPos;
  const { x: foodX, y: foodY } = fishFood;

  let differenceX = foodX - fishX;
  let differenceY = foodY - fishY;

  const angle = getAngle(
    foodX - fish.getBoundingClientRect().x,
    foodY - fish.getBoundingClientRect().y
  );

  if (differenceX > 0) {
    differenceX -= 30;
  } else {
    differenceX += 30;
  }

  if (differenceY > 0) {
    differenceY -= 30;
  } else {
    differenceY += 30;
  }

  const { x, y } = fish.getBoundingClientRect();

  const distance = Math.sqrt(
    Math.abs(foodX - x) ** 2 + Math.abs(foodY - y) ** 2
  );

  if (distance < 100) {
    onEnd();
  }

  fish.style.transition = `transform ${(
    (distance - Math.sqrt(30 ** 2 + 30 ** 2)) /
    100
  ).toFixed(2)}s linear`;
  // fish.style.transition = "transform 0.2s linear";
  fish.style.transform = `translate(${differenceX}px, ${differenceY}px) rotate(${angle}deg)`;
  // console.log(fish.style.transform);
  // console.log(angle);
  // fish.ontransitionend = () => {
  //   fish.style.transition = `transform ${(
  //     (distance - Math.sqrt(30 ** 2 + 30 ** 2)) /
  //     100
  //   ).toFixed(2)}s linear`;
  //   fish.style.transform = `translate(${differenceX}px, ${differenceY}px) rotate(${angle}deg)`;
  //   fish.ontransitionend = onEnd || null;
  // };
  fish.ontransitionend = onEnd || null;
}

export function radiansToDegrees(rad: number) {
  return (rad * 180) / Math.PI;
}

export function getAngle(x: number, y: number) {
  const rad = Math.atan2(y, x);
  return radiansToDegrees(rad);
}

export function getLine(a: number, b: number) {
  return Math.sqrt(a * a + b * b);
}
