export type TileType = "soil" | "grass";

export interface TileObject {
  plantId: number;
  id: number;
  type: TileType;
}

export type SpellName =
  | "Create Soil"
  | "Create Plant"
  | "SACRIFICE"
  | "Water Plant"
  | "Create Pond"
  | "Spawn Fish"
  | "Feed Fish"
  | "Lightning"
  | "Fire";

export interface Spell {
  id: number;
  name: SpellName;
  cost: number;
}

export interface SpellBarItem {
  spellId: number;
  numKey: number;
}

export interface PlantLevelProperties {
  yield: number;
  requirement: number;
}

export interface PlantObject {
  water: number;
  life: number;
  level: number;
  id: number;
  soil_moisture: number;
  color: string;
  cor: [number, number];
  yield: number;
  xp: number;
}

export interface World {
  time: {
    gameTime: number;
    dayTime: number;
    sessionTimeStamp: number;
    dayTimeStamp: number;
    day: number;
    morning: boolean;
    night: boolean;
    hour: number;
    minute: number;
  };
  tint: {
    opacity: number;
    color: string;
  };
}

export interface Player {
  spellBar: Array<SpellBarItem>;
  selectedSpellId: number;
  currency: {
    value: number;
  };
}

export interface FarmLand {
  tiles: Array<TileObject>;
  columns: number;
  size: number;
}

export interface Plants {
  list: Array<PlantObject>;
  lastPlantId: number;
}

export interface Animation {
  name: string;
  progress: number;
  start: number;
  end: number;
  range: number;
  value: number;
  startTime: number | null;
  animationLength: number;
  payload: any;
  id: number;
}

export default interface GameStore {
  world: World;
  player: Player;
  farmLand: FarmLand;
  plants: Plants;
  animations: {
    list: Array<Animation>;
    latestId: number;
  };
}
