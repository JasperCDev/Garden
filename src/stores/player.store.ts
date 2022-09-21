import { createStore } from "solid-js/store";

const ALL_SPELLS: Array<Spell> = [
  {
    id: 1,
    name: "Create Soil",
    cost: 30,
  },
  {
    id: 2,
    name: "Create Plant",
    cost: 500,
  },
  {
    id: 3,
    name: "Water Plant",
    cost: 30,
  },
  {
    id: 4,
    name: "SACRIFICE",
    cost: 0,
  },
  {
    id: 5,
    name: "Create Pond",
    cost: 100,
  },
  {
    id: 6,
    name: "Spawn Fish",
    cost: 1000,
  },
  {
    id: 7,
    name: "Feed Fish",
    cost: 50,
  },
  {
    id: 8,
    name: "Lightning",
    cost: 5000,
  },
  {
    id: 9,
    name: "Fire",
    cost: 5000,
  },
];

export interface Spell {
  id: number;
  name: string;
  cost: number;
}

export interface SpellBarItem {
  spellId: number;
  numKey: number;
}

interface Store {
  spellBar: Array<SpellBarItem>;
  selectedSpellId: number;
}

export const [playerStore, setPlayerStore] = createStore<Store>({
  spellBar: [
    {
      spellId: 1,
      numKey: 1,
    },
    {
      spellId: 2,
      numKey: 2,
    },
    {
      spellId: 3,
      numKey: 3,
    },
    {
      spellId: 4,
      numKey: 4,
    },
    {
      spellId: 5,
      numKey: 5,
    },
    {
      spellId: 6,
      numKey: 6,
    },
    {
      spellId: 7,
      numKey: 7,
    },
    {
      spellId: 8,
      numKey: 8,
    },
    {
      spellId: 9,
      numKey: 9,
    },
  ],
  selectedSpellId: 1,
});

export function getSpellById(id: number) {
  return ALL_SPELLS.find((s) => s.id === id);
}

export function getSpellByName(name: string) {
  return ALL_SPELLS.find((s) => s.name.toLowerCase() === name.toLowerCase())!;
}

export function setSelectedSpell(id: number) {
  setPlayerStore("selectedSpellId", id);
}

window.addEventListener("keypress", (e) => {
  const numKey = Number(e.key);
  if (Number.isNaN(numKey)) return;
  if (numKey < 1 || numKey > 9) return;

  setSelectedSpell(Number(e.key));
});
