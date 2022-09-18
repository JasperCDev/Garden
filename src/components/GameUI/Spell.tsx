import { getSpell, SpellBarItem } from "../../stores/player.store";
import styles from "./Spell.module.scss";

interface Props {
  spellBarItem: SpellBarItem;
}

export default function Spell(props: Props) {
  const item = props.spellBarItem;
  return (
    <div
      class={styles.spell}
      style={{ border: item.spellId === 1 ? "5px solid darkred" : "none" }}
    >
      <span>{getSpell(item.spellId)?.name}</span>
      <span style={{ position: "absolute", bottom: "0px" }}>{item.numKey}</span>
    </div>
  );
}
