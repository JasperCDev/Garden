import styles from "./App.module.css";
import Pond from "./components/Pond";
import Plant from "./components/Plant";
import { plants, setPlants } from "./stores/plants.store";
import { For } from "solid-js";
export default function App() {
  return (
    <div class={styles.App}>
      {/* <Pond /> */}
      <For each={plants.plants}>
        {(plant) => {
          return (
            <div
              style={{
                height: "82px",
                "background-color": "rgba(130, 64, 14, 50%)",
              }}
            >
              <Plant count={plant.count} />
            </div>
          );
        }}
      </For>
    </div>
  );
}
