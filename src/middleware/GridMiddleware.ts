import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import Grid from '../models/Grid';
import GridRepository from '../repositories/GridRepository';

@Injectable()
export default class GridMiddleware implements NestMiddleware {
  private readonly gridRepository;

  constructor (gridRepository: GridRepository) {
    this.gridRepository = gridRepository;
  }

  async use (req: Request, res: Response, next: (err?: Error) => void) {
    const grid: Grid = await this.gridRepository.fetchGrid(req.params.id);
    if (!grid) {
      throw new HttpException(`No grid exists with the id of ${req.params.id}`, HttpStatus.NOT_FOUND);
    }

    (req as any).grid = grid;
    next();
  }
}
