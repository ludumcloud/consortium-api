import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import Grid from '../models/Map';
import MapRepository from '../repositories/MapRepository';

@Injectable()
export default class MapMiddleware implements NestMiddleware {
  private readonly mapRepository: MapRepository;

  constructor (mapRepository: MapRepository) {
    this.mapRepository = mapRepository;
  }

  async use (req: Request, res: Response, next: (err?: Error) => void) {
    const id: number = parseInt(req.params.id, 10);
    const grid: Grid = await this.mapRepository.fetchGrid(id);
    if (!grid) {
      throw new HttpException(`No grid exists with the id of ${req.params.id}`, HttpStatus.NOT_FOUND);
    }

    (req as any).grid = grid;
    next();
  }
}
