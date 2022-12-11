const defaultStore = {
  world: {
    time: {
      day: 1,
      hour: 0,
      minute: 0,
    },
    tint: {
      opacity: 0.4,
      color: "#006AFF",
    },
    isDayEnd: false;
    paused: false;
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
    ],
    columns: 4,
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
        color: "black",
        cor: [0, 0],
        id: 1,
        level: 3,
        yield: 4000 * 0.2,
      },
    ],
    lastPlantId: 1,
  },
  animations: {
    list: [],
    latestId: 0,
  },
  frameCount: 0,
  pixiApp: null,
};

export default defaultStore;
