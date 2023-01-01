export type TileType = "soil" | "grass";

export interface TileObject {
  plantId: number;
  id: number;
  type: TileType;
  row: number;
  column: number;
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

export interface Time {
  day: number;
  hour: number;
  minute: number;
}

export interface World {
  time: Time;
  tint: {
    opacity: number;
    color: string;
  };
  isDayEnd: boolean;
  isDayStart: boolean;
  paused: boolean;
}

export interface PlantParticleObj {
  progress: number;
  id: number;
  tileId: number;
}

export interface PlantParticles {
  [tileId: number]: PlantParticleObj;
  latestId: number;
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
  latestId: number;
}

export interface Animation {
  name:
    | "animate soil"
    | "level up plant"
    | "tick world time"
    | "plant particle";
  progress: number;
  start: number;
  end: number;
  range: number;
  frameCount: number;
  frameDuration: number;
  duration: number;
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
  frameCount: number;
  sword: {
    ref: SVGSVGElement | undefined;
  };
  plantParticles: PlantParticles;
}
