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

export interface Terrain {
  landform: Landform;
  biome: Mountains | Hills | Plains | Depressions;
}

export function calculateBiome (elevation: number, moisture: number): Terrain {
  if (elevation <= 0.12) {
    return buildDepressionsBiome(elevation);
  } else if (elevation <= .35) {
    return buildPlainsBiome(moisture);
  } else if (elevation <= .70) {
    return buildHillsBiome(moisture);
  } else {
    return buildMountainsBiome(moisture);
  }
}

function buildDepressionsBiome (elevation: number): Terrain {
  const depression: Terrain = {
    landform: 'Depression'
  } as Terrain;

  if (elevation <= 0.1) {
    depression.biome = Depressions.Ocean;
  } else if (elevation <= 0.12) {
    depression.biome = Depressions.Beach;
  }

  return depression;
}

function buildPlainsBiome (moisture: number): Terrain {
  const plain: Terrain = {
    landform: 'Plain'
  } as Terrain;

  if (moisture < 0.16)
    plain.biome = Plains.Temperate;
  else if (moisture < 0.33)
    plain.biome = Plains.Grassland;
  else if (moisture < 0.66)
    plain.biome = Plains.Forest;
  else
    plain.biome = Plains.RainForest;

  return plain;
}

function buildHillsBiome (moisture: number): Terrain {
  const hill: Terrain = {
    landform: 'Hill'
  } as Terrain;

  if (moisture < 0.16)
    hill.biome = Hills.Temperate;
  else if (moisture < 0.50)
    hill.biome = Hills.Shrubland;
  else if (moisture < 0.83)
    hill.biome = Hills.Forest;
  else
    hill.biome = Hills.RainForest;

  return hill;
}

function buildMountainsBiome (moisture: number): Terrain {
  const mountain: Terrain = {
    landform: 'Mountain'
  } as Terrain;

  if (moisture < 0.1)
    mountain.biome = Mountains.Bare;
  else if (moisture < 0.2)
    mountain.biome = Mountains.Rocky;
  else if (moisture < 0.5)
    mountain.biome = Mountains.Tundra;
  else
    mountain.biome = Mountains.Snow;

  return mountain;
}
