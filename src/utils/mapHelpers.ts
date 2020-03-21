import * as crypto from 'crypto';
import * as util from 'util';
import { TileCreationOptions } from '../repositories/TileRepository';
import { Depressions, Mountains, Plains, Terrain } from '../types/terrain';
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
  if (elevation <= 0.18) {
    return buildDepressionsBiome(elevation);
  } else if (elevation <= .70) {
    return buildPlainsBiome(moisture);
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
  } else {
    depression.biome = Depressions.Beach;
  }

  return depression;
}

function buildPlainsBiome (moisture: number): Terrain {
  const plain: Terrain = {
    landform: 'Plain'
  } as Terrain;

  if (moisture < 0.33)
    plain.biome = Plains.Grassland;
  else
    plain.biome = Plains.Forest;
  return plain;
}

function buildMountainsBiome (moisture: number): Terrain {
  const mountain: Terrain = {
    landform: 'Mountain'
  } as Terrain;

  if (moisture < 0.5)
    mountain.biome = Mountains.Bare;
  else
    mountain.biome = Mountains.Snow;

  return mountain;
}
