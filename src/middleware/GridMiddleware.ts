import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import Grid from '../models/Grid';
import GridRepository from '../repositories/GridRepository';

@Injectable()
export default class GridMiddleware implements NestMiddleware {
  private readonly gridRepository: GridRepository;

  constructor (gridRepository: GridRepository) {
    this.gridRepository = gridRepository;
  }

  async use (req: Request, res: Response, next: (err?: Error) => void) {
    const id: number = parseInt(req.params.id, 10);
    const grid: Grid = await this.gridRepository.fetchGrid(id);
    if (!grid) {
      throw new HttpException(`No grid exists with the id of ${req.params.id}`, HttpStatus.NOT_FOUND);
    }

    (req as any).grid = grid;
    next();
  }
}
