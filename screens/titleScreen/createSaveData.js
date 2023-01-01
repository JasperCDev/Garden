const COLUMNS = 7;

function createTile(n) {
  return {
    id: n,
    column: Math.floor(n % COLUMNS),
    row: Math.floor(n % COLUMNS),
    plantId: n === 1 ? 1 : -1,
    type: n === 1 ? "soil" : "grass",
  };
}

const createSaveData = () => {
  const tiles = new Array(COLUMNS ** 2)
    .fill(null)
    .map((_, indx) => createTile(indx + 1));
  return {
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
      isDayEnd: false,
      isDayStart: true,
      paused: false,
    },
    farmLand: {
      tiles,
      columns: COLUMNS,
      size: COLUMNS,
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
          life: 600,
          soil_moisture: 0,
          color: "lightgreen",
          cor: [0, 0],
          id: 1,
          level: 1,
          yield: 600 * 0.2,
          xp: 600,
        },
      ],
      latestId: 1,
    },
    animations: {
      list: [],
      latestId: 0,
    },
    frameCount: 0,
    sword: {
      ref: undefined,
    },
    plantParticles: { latestId: 0 },
  };
};

export default createSaveData;
