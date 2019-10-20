import { Body, Controller, Post } from '@nestjs/common';
import HexagonalGrid from '../models/HexagonalGrid';
import { CreateRequest } from '../schemas';
import MapBuilder from '../utils/MapBuilder';

@Controller('/v1/map')
export default class MapController {

  @Post()
  public async generateMap (@Body() body: CreateRequest): Promise<HexagonalGrid> {
    const { width, height, seed } = body;
    const builder = new MapBuilder();

    return builder
      .setHeight(height)
      .setWidth(width)
      .setSeed(seed)
      .build();
  }
}
