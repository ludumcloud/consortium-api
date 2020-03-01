import * as crypto from 'crypto';
import * as util from 'util';
import { TileCreationOptions } from '../repositories/TileRepository';
import { Depressions, Hills, Mountains, Plains, Terrain } from '../types/terrain';
import NoiseGenerator, { NoiseGeneratorOptions } from './NoiseGenerator';

const randomBytes = util.promisify(crypto.randomBytes);

export function generateSeed (): Promise<string> {
  return randomBytes(128).then((buffer: Buffer) => buffer.toString('hex'));
}

export function generateTile (x: number, y: number, width: number, height: number, exponent: number, seed: string): Promise<TileCreationOptions> {
  return new Promise((resolve) => {
    // split the seed in half, one part for elevation the other moisture
    const length: number = seed.length / 2;
    const elevationGenerator: NoiseGenerator = new NoiseGenerator(seed.slice(0, length));
    const moistureGenerator: NoiseGenerator = new NoiseGenerator(seed.slice(length));

    const generatorOptions: NoiseGeneratorOptions = {
      x,
      y,
      width,
      height,
      exponent
    };
    const elevation: number = elevationGenerator.calculate(generatorOptions);
    const moisture: number = moistureGenerator.calculate(generatorOptions);
    const terrain: Terrain = calculateBiome(elevation, moisture);
    const tileOptions: TileCreationOptions = {
      biome: terrain.biome,
      landform: terrain.landform,
      x,
      y
    };

    // Delay the resolution of the tile to the next tick of the event loop
    return setTimeout(resolve.bind(this, tileOptions), 0);
  });
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
