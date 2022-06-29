export function swimToFood(
  fish: HTMLDivElement,
  fishPos: { x: number; y: number },
  fishFood: { x: number; y: number },
  onEnd?: () => void
) {
  const { x: fishX, y: fishY } = fishPos;
  const { x: foodX, y: foodY } = fishFood;

  let differenceX = foodX - fishX;
  let differenceY = foodY - fishY;

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

  const distance = Math.sqrt(
    Math.abs(foodX - fish.getBoundingClientRect().x) ** 2 +
      Math.abs(foodY - fish.getBoundingClientRect().y) ** 2
  );

  fish.style.transition = `transform ${distance / 500}s linear`;
  fish.style.transform = `translate(${differenceX}px, ${differenceY}px)`;
  fish.ontransitionend = onEnd || null;
}
