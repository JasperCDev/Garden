export function swimToFood(
  fish: HTMLDivElement,
  fishPos: { x: number; y: number },
  fishFood: { x: number; y: number },
  onEnd?: () => void
) {
  const { x: fishX, y: fishY } = fishPos;
  const { x: foodX, y: foodY } = fishFood;

  const differenceX = foodX - fishX;
  const differenceY = foodY - fishY;

  const distance = Math.sqrt(
    Math.abs(foodX - fish.getBoundingClientRect().x) ** 2 +
      Math.abs(foodY - fish.getBoundingClientRect().y) ** 2
  );

  fish.style.transition = `transform ${distance / 100}s linear`;
  fish.style.transform = `translate(${differenceX}px, ${differenceY}px)`;
  fish.ontransitionend = onEnd || null;
}
