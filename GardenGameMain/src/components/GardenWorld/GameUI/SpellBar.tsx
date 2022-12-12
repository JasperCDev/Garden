import { For } from "solid-js";
import { gameStore } from "@/stores/gameStore";
import Spell from "./Spell";

import styles from "./SpellBar.module.scss";

export default function SpellBar() {
  return (
    <div class={styles.spellBar}>
      <For each={gameStore.player.spellBar}>
        {(s) => <Spell spellBarItem={s} />}
      </For>
    </div>
  );
}
