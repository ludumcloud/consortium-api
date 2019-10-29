import { Injectable } from '@nestjs/common';
import { Any, getRepository, Repository, } from 'typeorm';
import Grid from '../models/Grid';
import Tile from '../models/Tile';

@Injectable()
export default class TileRepository {
  private readonly tileRepository: Repository<Tile>;

  constructor () {
    this.tileRepository = getRepository(Tile);
  }

  async fetchTilesByRange (grid: Grid, startX: number, endX: number, startY: number, endY: number): Promise<Tile[]> {
    const xValues: number[] = Array(endX - startX + 1).fill(undefined).map((value, idx) => startX + idx);
    const yValues: number[] = Array(endY - startY + 1 ).fill(undefined).map((value, idx) => startY + idx);
    return this.tileRepository.find({
      select: ['x', 'y', 'landform', 'biome'],
      where: {
        grid,
        x: Any(xValues),
        y: Any(yValues)
      }
    });
  }

  async createTiles (tile: Tile[]): Promise<Tile[]> {
    return this.tileRepository.save(tile);
  }
}
