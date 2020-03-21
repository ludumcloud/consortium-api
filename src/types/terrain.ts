export enum Mountains {
  Bare = 'bare',
  Snow = 'snow'
}

export enum Plains {
  Grassland = 'grassland',
  Forest = 'forest',
}

export enum Depressions {
  Beach = 'beach',
  Ocean = 'ocean'
}

export type Landform = 'Mountain' | 'Plain' | 'Depression';
export type Biome = Mountains | Plains | Depressions;

export interface Terrain {
  landform: Landform;
  biome: Biome;
}
