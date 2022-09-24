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
      hour: 0,
      minute: 0,
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
        plantId: 1,
        type: "soil",
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
      {
        id: 10,
        plantId: -1,
        type: "grass",
      },
      {
        id: 11,
        plantId: -1,
        type: "grass",
      },
      {
        id: 12,
        plantId: -1,
        type: "grass",
      },
      {
        id: 13,
        plantId: -1,
        type: "grass",
      },
      {
        id: 14,
        plantId: -1,
        type: "grass",
      },
      {
        id: 15,
        plantId: -1,
        type: "grass",
      },
      {
        id: 16,
        plantId: -1,
        type: "grass",
      },
      {
        id: 17,
        plantId: -1,
        type: "grass",
      },
      {
        id: 18,
        plantId: -1,
        type: "grass",
      },
      {
        id: 19,
        plantId: -1,
        type: "grass",
      },
      {
        id: 20,
        plantId: -1,
        type: "grass",
      },
      {
        id: 21,
        plantId: -1,
        type: "grass",
      },
      {
        id: 22,
        plantId: -1,
        type: "grass",
      },
      {
        id: 23,
        plantId: -1,
        type: "grass",
      },
      {
        id: 24,
        plantId: -1,
        type: "grass",
      },
      {
        id: 25,
        plantId: -1,
        type: "grass",
      },
      {
        id: 26,
        plantId: -1,
        type: "grass",
      },
      {
        id: 27,
        plantId: -1,
        type: "grass",
      },
      {
        id: 28,
        plantId: -1,
        type: "grass",
      },
      {
        id: 29,
        plantId: -1,
        type: "grass",
      },
      {
        id: 30,
        plantId: -1,
        type: "grass",
      },
      {
        id: 31,
        plantId: -1,
        type: "grass",
      },
      {
        id: 32,
        plantId: -1,
        type: "grass",
      },
      {
        id: 33,
        plantId: -1,
        type: "grass",
      },
      {
        id: 34,
        plantId: -1,
        type: "grass",
      },
      {
        id: 35,
        plantId: -1,
        type: "grass",
      },
      {
        id: 36,
        plantId: -1,
        type: "grass",
      },
      {
        id: 37,
        plantId: -1,
        type: "grass",
      },
      {
        id: 38,
        plantId: -1,
        type: "grass",
      },
      {
        id: 39,
        plantId: -1,
        type: "grass",
      },
      {
        id: 40,
        plantId: -1,
        type: "grass",
      },
      {
        id: 41,
        plantId: -1,
        type: "grass",
      },
      {
        id: 42,
        plantId: -1,
        type: "grass",
      },
      {
        id: 43,
        plantId: -1,
        type: "grass",
      },
      {
        id: 44,
        plantId: -1,
        type: "grass",
      },
      {
        id: 45,
        plantId: -1,
        type: "grass",
      },
      {
        id: 46,
        plantId: -1,
        type: "grass",
      },
      {
        id: 47,
        plantId: -1,
        type: "grass",
      },
      {
        id: 48,
        plantId: -1,
        type: "grass",
      },
      {
        id: 49,
        plantId: -1,
        type: "grass",
      },
    ],
    columns: 7,
    size: 3,
  },
  player: {
    currency: {
      value: 1000,
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
    list: [
      {
        water: 0,
        life: 4000,
        xp: 4000,
        soil_moisture: 0,
        color: "lightgreen",
        cor: [0, 0],
        id: 1,
        level: 1,
        yield: 300 * 0.2,
      },
    ],
    lastPlantId: 1,
  },
};

export default defaultStore;
