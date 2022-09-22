export type TileType = "soil" | "grass";

export interface TileObject {
  plantId: number;
  id: number;
  type: TileType;
}

export interface Spell {
  id: number;
  name: string;
  cost: number;
}

export interface SpellBarItem {
  spellId: number;
  numKey: number;
}

export interface PlantObject {
  water: number;
  life: number;
  id: number;
  soil_moisture: number;
  color: string;
  cor: [number, number];
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

export default interface GameStore {
  world: World;
  player: Player;
  farmLand: FarmLand;
  plants: Plants;
}
