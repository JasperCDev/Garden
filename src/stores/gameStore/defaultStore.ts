import GameStore from "./store.types";

const loadTime = Date.now();

const defaultStore: GameStore = {
  world: {
    time: {
      gameTime: 0.0,
      dayTime: 0.0,
      sessionTimeStamp: loadTime,
      dayTimeStamp: loadTime,
      day: 1,
      morning: true,
      night: false,
    },
    tint: {
      opacity: 0.2,
      color: "orange",
    },
  },
  farmLand: {
    tiles: [
      {
        id: 1,
        plantId: -1,
        type: "grass",
      },
      {
        id: 2,
        plantId: -1,
        type: "grass",
      },
      {
        id: 3,
        plantId: -1,
        type: "grass",
      },
      {
        id: 4,
        plantId: -1,
        type: "grass",
      },
      {
        id: 5,
        plantId: -1,
        type: "grass",
      },
      {
        id: 6,
        plantId: -1,
        type: "grass",
      },
      {
        id: 7,
        plantId: -1,
        type: "grass",
      },
      {
        id: 8,
        plantId: -1,
        type: "grass",
      },
      {
        id: 9,
        plantId: -1,
        type: "grass",
      },
    ],
    columns: 3,
    size: 1,
  },
  player: {
    currency: {
      value: 0,
    },
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
  },
  plants: {
    list: [],
    lastPlantId: 1,
  },
};

export default defaultStore;
