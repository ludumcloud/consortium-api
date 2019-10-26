import { Injectable } from '@nestjs/common';
import { getRepository, LessThanOrEqual, MoreThanOrEqual, Repository, } from 'typeorm';
import Grid from '../models/Grid';
import Tile from '../models/Tile';

@Injectable()
export default class TileRepository {
  private readonly tileRepository: Repository<Tile>;

  constructor () {
    this.tileRepository = getRepository(Tile);
  }

  async fetchTilesByRange (grid: Grid, startX: number, endX: number, startY: number, endY: number): Promise<Tile[]> {
    return this.tileRepository.find({
      grid,
      x: MoreThanOrEqual(startX) && LessThanOrEqual(endX),
      y: MoreThanOrEqual(startY) && LessThanOrEqual(endY)
    });
  }

  async createTiles (tile: Tile[]): Promise<Tile[]> {
    return this.tileRepository.save(tile);
  }
}
