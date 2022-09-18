import {
  getSpellById,
  playerStore,
  setSelectedSpell,
  SpellBarItem,
} from "../../stores/player.store";
import styles from "./Spell.module.scss";

interface Props {
  spellBarItem: SpellBarItem;
}

export default function Spell(props: Props) {
  const item = props.spellBarItem;

  function handleSpellClick() {
    setSelectedSpell(item.spellId);
  }

  return (
    <div
      class={styles.spell}
      style={{
        border:
          playerStore.selectedSpellId === item.spellId
            ? "5px solid darkred"
            : "none",
      }}
      onClick={handleSpellClick}
    >
      <span>{getSpellById(item.spellId)?.name}</span>
      <span style={{ position: "absolute", bottom: "0px" }}>{item.numKey}</span>
    </div>
  );
}
