import { JSX } from "solid-js/jsx-runtime";
import { PlantObject } from "@/stores/gameStore";
import styles from "./Plant.module.scss";

function getOffSet(current: number, target: number, pathlength: number) {
  const progress = Math.min(current / target, 1);
  return progress * pathlength + pathlength;
}

function getStemWidth(current: number, target: number) {
  const progress = Math.min(current / target, 1);
  return Math.max(progress * 3, 1);
}

const maxClicks = 3000;

const leafPoints: { [key: string]: number } = {
  leaf1: Math.round(maxClicks * 0.28),
  leaf2: Math.round(maxClicks * 0.34),
  leaf3: Math.round(maxClicks * 0.52),
  leaf4: Math.round(maxClicks * 0.58),
  leaf5: Math.round(maxClicks * 0.76),
  leaf6: Math.round(maxClicks * 0.82),
  leaf7: Math.round(maxClicks * 1.0),
  leaf8: Math.round(maxClicks * 1.0),
};

interface Props {
  plant: PlantObject;
}

export default function Plant(props: Props) {
  function createCSS() {
    const obj: JSX.CSSProperties = {
      "--off-set": getOffSet(props.plant.life, maxClicks, 250),
      "--stem-width": getStemWidth(props.plant.life, maxClicks),
      "--color": props.plant.color,
    };

    for (const leaf in leafPoints) {
      const points = leafPoints[leaf];
      obj[`--${leaf}-scale`] = Math.min(props.plant.life / points - 1, 1);
    }

    return obj;
  }

  const plantCustomProperties = () => createCSS();

  return (
    <svg
      width="150%"
      height="150%"
      viewBox="0 0 64 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class={styles.plant}
      style={plantCustomProperties()}
    >
      {props.plant.life >= leafPoints.leaf8 && (
        <>
          <path
            class={styles.leaf + " " + styles.leaf8}
            d="M16 0.5C20.3618 0.5 24.2862 1.32977 27.1015 2.64943C29.9566 3.98777 31.5 5.7374 31.5 7.5C31.5 9.2626 29.9566 11.0122 27.1015 12.3506C24.2862 13.6702 20.3618 14.5 16 14.5C11.6382 14.5 7.71379 13.6702 4.89851 12.3506C2.04337 11.0122 0.5 9.2626 0.5 7.5C0.5 5.7374 2.04337 3.98777 4.89851 2.64943C7.71379 1.32977 11.6382 0.5 16 0.5Z"
          />
          <path
            class={styles.leaf + " " + styles.leaf7}
            d="M48 0.5C52.3618 0.5 56.2862 1.32977 59.1015 2.64943C61.9566 3.98777 63.5 5.7374 63.5 7.5C63.5 9.2626 61.9566 11.0122 59.1015 12.3506C56.2862 13.6702 52.3618 14.5 48 14.5C43.6382 14.5 39.7138 13.6702 36.8985 12.3506C34.0434 11.0122 32.5 9.2626 32.5 7.5C32.5 5.7374 34.0434 3.98777 36.8985 2.64943C39.7138 1.32977 43.6382 0.5 48 0.5Z"
          />
        </>
      )}
      {props.plant.life >= leafPoints.leaf6 && (
        <path
          class={styles.leaf + " " + styles.leaf6}
          d="M16 45.5C20.3618 45.5 24.2862 46.3298 27.1015 47.6494C29.9566 48.9878 31.5 50.7374 31.5 52.5C31.5 54.2626 29.9566 56.0122 27.1015 57.3506C24.2862 58.6702 20.3618 59.5 16 59.5C11.6382 59.5 7.71379 58.6702 4.89851 57.3506C2.04337 56.0122 0.5 54.2626 0.5 52.5C0.5 50.7374 2.04337 48.9878 4.89851 47.6494C7.71379 46.3298 11.6382 45.5 16 45.5Z"
        />
      )}
      {props.plant.life >= leafPoints.leaf5 && (
        <path
          class={styles.leaf + " " + styles.leaf5}
          d="M48 60.5C52.3618 60.5 56.2862 61.3298 59.1015 62.6494C61.9566 63.9878 63.5 65.7374 63.5 67.5C63.5 69.2626 61.9566 71.0122 59.1015 72.3506C56.2862 73.6702 52.3618 74.5 48 74.5C43.6382 74.5 39.7138 73.6702 36.8985 72.3506C34.0434 71.0122 32.5 69.2626 32.5 67.5C32.5 65.7374 34.0434 63.9878 36.8985 62.6494C39.7138 61.3298 43.6382 60.5 48 60.5Z"
        />
      )}
      {props.plant.life >= leafPoints.leaf4 && (
        <path
          class={styles.leaf + " " + styles.leaf4}
          d="M16 105.5C20.3618 105.5 24.2862 106.33 27.1015 107.649C29.9566 108.988 31.5 110.737 31.5 112.5C31.5 114.263 29.9566 116.012 27.1015 117.351C24.2862 118.67 20.3618 119.5 16 119.5C11.6382 119.5 7.71379 118.67 4.89851 117.351C2.04337 116.012 0.5 114.263 0.5 112.5C0.5 110.737 2.04337 108.988 4.89851 107.649C7.71379 106.33 11.6382 105.5 16 105.5Z"
        />
      )}
      {props.plant.life >= leafPoints.leaf3 && (
        <path
          class={styles.leaf + " " + styles.leaf3}
          d="M48 120.5C52.3618 120.5 56.2862 121.33 59.1015 122.649C61.9566 123.988 63.5 125.737 63.5 127.5C63.5 129.263 61.9566 131.012 59.1015 132.351C56.2862 133.67 52.3618 134.5 48 134.5C43.6382 134.5 39.7138 133.67 36.8985 132.351C34.0434 131.012 32.5 129.263 32.5 127.5C32.5 125.737 34.0434 123.988 36.8985 122.649C39.7138 121.33 43.6382 120.5 48 120.5Z"
        />
      )}
      {props.plant.life >= leafPoints.leaf2 && (
        <path
          class={styles.leaf + " " + styles.leaf2}
          d="M16 165.5C20.3618 165.5 24.2862 166.33 27.1015 167.649C29.9566 168.988 31.5 170.737 31.5 172.5C31.5 174.263 29.9566 176.012 27.1015 177.351C24.2862 178.67 20.3618 179.5 16 179.5C11.6382 179.5 7.71379 178.67 4.89851 177.351C2.04337 176.012 0.5 174.263 0.5 172.5C0.5 170.737 2.04337 168.988 4.89851 167.649C7.71379 166.33 11.6382 165.5 16 165.5Z"
        />
      )}
      {props.plant.life >= leafPoints.leaf1 && (
        <path
          class={styles.leaf + " " + styles.leaf1}
          d="M48 180.5C52.3618 180.5 56.2862 181.33 59.1015 182.649C61.9566 183.988 63.5 185.737 63.5 187.5C63.5 189.263 61.9566 191.012 59.1015 192.351C56.2862 193.67 52.3618 194.5 48 194.5C43.6382 194.5 39.7138 193.67 36.8985 192.351C34.0434 191.012 32.5 189.263 32.5 187.5C32.5 185.737 34.0434 183.988 36.8985 182.649C39.7138 181.33 43.6382 180.5 48 180.5Z"
        />
      )}
      <path class={styles.stem} d="M32 8V240" stroke="#006D1F" />
    </svg>
  );
}
