import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import Grid from '../models/Grid';

@Injectable()
export default class GridRepository {
  private readonly gridRepository: Repository<Grid>;

  constructor () {
    this.gridRepository = getRepository(Grid);
  }

  public async createGrid (width: number, height: number, seed: string, exponent: number): Promise<Grid> {
    const hexagonalGrid = new Grid();
    hexagonalGrid.height = height;
    hexagonalGrid.width = width;
    hexagonalGrid.exponent = exponent;
    hexagonalGrid.seed = seed;

    return this.gridRepository.save(hexagonalGrid);
  }

  public async fetchGrid (gridId: number): Promise<Grid> {
    return this.gridRepository.findOne({
      id: gridId
    });
  }
}
