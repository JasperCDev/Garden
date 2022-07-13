import styles from "./App.module.css";
import Plant from "./components/Plant";
import { plants } from "./stores/plants.store";
import { For } from "solid-js";
import Rain from "./components/Rain";

export default function App() {
  return (
    <div class={styles.App}>
      {/* <Pond /> */}
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          "max-width": "50vw",
          "max-height": "50vh",
        }}
      >
        <For each={plants.plants}>
          {(plant) => {
            return (
              <div
                style={{
                  border: "1px solid #4d2101",
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
      <Rain />
    </div>
  );
}
