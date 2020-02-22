import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import * as _ from 'lodash';
import GridParam from '../decorators/GridDecorator';
import Map from '../models/Map';
import Tile from '../models/Tile';
import MapRepository from '../repositories/MapRepository';
import TileRepository from '../repositories/TileRepository';
import { MapBody, TilesQuery } from '../schemas';
import { generateSeed, generateTile } from '../utils/mapHelpers';

const DEFAULT_WIDTH: number = 7;
const DEFAULT_HEIGHT: number = 7;
const DEFAULT_EXPONENT: number = 3;

@Controller('/v1/map')
export default class MapController {
  private readonly mapRepository: MapRepository;
  private readonly tileRepository: TileRepository;

  constructor (mapRepository: MapRepository, tileRepository: TileRepository) {
    this.mapRepository = mapRepository;
    this.tileRepository = tileRepository;
  }

  @Post()
  public async generateGrid (@Body() body: MapBody): Promise<Map> {
    const seed: string = body.seed || await generateSeed();
    const height: number = body.height || DEFAULT_HEIGHT;
    const width: number = body.width || DEFAULT_WIDTH;
    const exponent: number = body.exponent || DEFAULT_EXPONENT;

    return this.mapRepository.createMap(width, height, seed, exponent);
  }

  @Get('/:id')
  public async getMap (@Param() params): Promise<Map> {
    return this.mapRepository.fetchMap(params.id);
  }
}
