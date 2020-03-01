import { Injectable } from '@nestjs/common';
import Map from '../models/Map';
import Tile from '../models/Tile';
import MapRepository from '../repositories/MapRepository';
import TileRepository, { TileCreationOptions } from '../repositories/TileRepository';
import { generateSeed, generateTile } from '../utils/mapHelpers';

const DEFAULT_WIDTH: number = 20;
const DEFAULT_HEIGHT: number = 20;
const DEFAULT_EXPONENT: number = 3;

export interface MapCreationOptions {
  width?: number;
  height?: number;
  seed?: string;
  exponent?: number;
}

@Injectable()
export default class MapService {
  private readonly tileRepository: TileRepository;
  private readonly mapRepository: MapRepository;

  constructor (tileRepository: TileRepository, mapRepository: MapRepository) {
    this.tileRepository = tileRepository;
    this.mapRepository = mapRepository;
  }

  public async createMap (creationOptions: MapCreationOptions): Promise<Map> {
    const width = creationOptions.width || DEFAULT_WIDTH;
    const height = creationOptions.height || DEFAULT_HEIGHT;
    const exponent = creationOptions.exponent || DEFAULT_EXPONENT;
    const seed = creationOptions.seed || await generateSeed();

    // create the map without the tiles so the tiles can have a reference to the map when we create them
    const map: Map = await this.mapRepository.createMap(width, height, seed, exponent);

    const tileOptions: TileCreationOptions[] = await this.createTilesOptions(width, height, seed, exponent);
    const tilePromises: Array<Promise<Tile>> = tileOptions.map((options): Promise<Tile> => {
      return this.tileRepository.createTile({...options, map});
    });
    await Promise.all(tilePromises);

    return map;
  }

  private async createTilesOptions (width: number, height: number, seed: string, exponent: number): Promise<TileCreationOptions[]> {
    const tileOptions: TileCreationOptions[] = [];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        tileOptions.push(await generateTile(x, y, width, height, exponent, seed));
      }
    }
    return tileOptions;
  }
}
