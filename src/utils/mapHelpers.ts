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

export type Biomes = Mountains | Hills | Plains | Depressions;

export function calculateBiome (elevation, moisture): Biomes {
  // Depressions
  if (elevation <= 0.1) {
    return Depressions.Ocean;
  }
  if (elevation <= 0.12) {
    return Depressions.Beach;
  }

  // Plains
  if (elevation <= .35) {
    if (moisture < 0.16)
      return Plains.Temperate;
    if (moisture < 0.33)
      return Plains.Grassland;
    if (moisture < 0.66)
      return Plains.Forest;
    return Plains.RainForest;
  }

  // Hills
  if (elevation <= .70) {
    if (moisture < 0.16)
      return Hills.Temperate;
    if (moisture < 0.50)
      return Hills.Shrubland;
    if (moisture < 0.83)
      return Hills.Forest;
    return Hills.RainForest;
  }

  // Mountains
  if (moisture < 0.1)
    return Mountains.Bare;
  if (moisture < 0.2)
    return Mountains.Rocky;
  if (moisture < 0.5)
    return Mountains.Tundra;
  return Mountains.Snow;
}
