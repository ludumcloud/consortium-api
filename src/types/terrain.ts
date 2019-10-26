export enum Mountains {
  Bare = 'bare',
  Rocky = 'rocky',
  Tundra = 'tundra',
  Snow = 'snow'
}

export enum Hills {
  Temperate = 'temperate',
  Shrubland = 'shrubland',
  RainForest = 'rainforest',
  Forest = 'forest'
}

export enum Plains {
  Temperate = 'temperate',
  Grassland = 'grassland',
  Forest = 'forest',
  RainForest = 'rainforest'
}

export enum Depressions {
  Beach = 'beach',
  Ocean = 'ocean'
}

export type Landform = 'Mountain' | 'Hill' | 'Plain' | 'Depression';
export type Biome = Mountains | Hills | Plains | Depressions;

export interface Terrain {
  landform: Landform;
  biome: Biome;
}
