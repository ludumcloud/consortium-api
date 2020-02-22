import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import Map from '../models/Map';

@Injectable()
export default class MapRepository {
  private readonly mapRepository: Repository<Map>;

  constructor () {
    this.mapRepository = getRepository(Map);
  }

  public async createMap (width: number, height: number, seed: string, exponent: number): Promise<Map> {
    const map = new Map();
    map.height = height;
    map.width = width;
    map.exponent = exponent;
    map.seed = seed;

    return this.mapRepository.save(map);
  }

  public async fetchMap (gridId: number): Promise<Map> {
    return this.mapRepository.findOne({
      id: gridId
    });
  }
}
