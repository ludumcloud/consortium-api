import { Injectable } from '@nestjs/common';
import { getRepository, Repository, } from 'typeorm';
import Map from '../models/Map';
import Tile from '../models/Tile';
import { Biome, Landform } from '../types/terrain';

@Injectable()
export default class TileRepository {
  private readonly tileRepository: Repository<Tile>;

  constructor () {
    this.tileRepository = getRepository(Tile);
  }

  async createTile (tileOptions: TileCreationOptions): Promise<Tile> {
    const tile: Tile = new Tile();
    tile.x = tileOptions.x;
    tile.y = tileOptions.y;
    tile.landform = tileOptions.landform;
    tile.biome = tileOptions.biome;
    tile.map = Promise.resolve(tileOptions.map);

    return this.tileRepository.create(tile);
  }
}

export interface TileCreationOptions  {
  x: number;
  y: number;
  landform: Landform;
  biome: Biome;
  map?: Map;
}
