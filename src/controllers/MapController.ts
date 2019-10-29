import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import * as _ from 'lodash';
import GridParam from '../decorators/GridDecorator';
import Grid from '../models/Grid';
import Tile from '../models/Tile';
import GridRepository from '../repositories/GridRepository';
import TileRepository from '../repositories/TileRepository';
import { MapBody, TilesQuery } from '../schemas';
import { generateSeed, generateTile } from '../utils/mapHelpers';

const DEFAULT_WIDTH: number = 7;
const DEFAULT_HEIGHT: number = 7;
const DEFAULT_EXPONENT: number = 3;

@Controller('/v1/map')
export default class MapController {
  private readonly gridRepository: GridRepository;
  private readonly tileRepository: TileRepository;

  constructor (gridRepository: GridRepository, tileRepository: TileRepository) {
    this.gridRepository = gridRepository;
    this.tileRepository = tileRepository;
  }

  @Post()
  public async generateGrid (@Body() body: MapBody): Promise<Grid> {
    const seed: string = body.seed || await generateSeed();
    const height: number = body.height || DEFAULT_HEIGHT;
    const width: number = body.width || DEFAULT_WIDTH;
    const exponent: number = body.exponent || DEFAULT_EXPONENT;

    return this.gridRepository.createGrid(width, height, seed, exponent);
  }

  @Get('/:id')
  public async getGrid (@Param() params): Promise<Grid> {
    return this.gridRepository.fetchGrid(params.id);
  }

  @Get('/:id/tiles')
  public async fetchTiles (@GridParam() grid: Grid, @Query() query: TilesQuery, @Param() param): Promise<Tile[]> {
    const { x, y, range } = query;

    return this.fetchTilesWithinRange(grid, x, y, range);
  }

  private async fetchTilesWithinRange (grid: Grid, x: number, y: number, range: number): Promise<Tile[]> {
    const { height, width, seed, exponent } = grid;
    // calculate the range of which the tiles should be generated
    const halfRange = Math.floor(range / 2);
    const startX: number = Math.max(0, x - halfRange);
    const endX: number = Math.min(width, x + halfRange);
    const startY: number = Math.max(0, y - halfRange);
    const endY: number = Math.min(height, y + halfRange);
    // fetch all the possible tiles
    const tiles: Tile[] = await this.tileRepository.fetchTilesByRange(grid, startX, endX, startY, endY);
    /// check if any tiles are missing and generate them
    const missingTiles: Tile[] = [];
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        const missingTile: boolean = !_.find(tiles, { x: i, y: j });
        if (missingTile) {
          missingTiles.push(
            generateTile(grid, i, j, width, height, exponent, seed)
          );
        }
      }
    }

    const createdTiles: Tile[] = await this.tileRepository.createTiles(missingTiles);
    return tiles.concat(
      createdTiles.map((tile: Tile) => _.omit(tile, ['id', '__grid__', '__has_grid__']))
    );
  }
}
