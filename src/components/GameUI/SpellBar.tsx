import { For } from "solid-js";
import { playerStore } from "../../stores/player.store";
import Spell from "./Spell";

import styles from "./SpellBar.module.scss";

export default function SpellBar() {
  return (
    <div class={styles.spellBar}>
      <For each={playerStore.spellBar}>{(s) => <Spell spellBarItem={s} />}</For>
    </div>
  );
}
