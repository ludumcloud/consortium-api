import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import Map from '../models/Map';
import Match from '../models/Match';
import Participant from '../models/Participant';

@Injectable()
export default class MatchRepository {
  private readonly matchRepository: Repository<Match>;

  constructor () {
    this.matchRepository = getRepository(Match);
  }

  public createMatch (participants: Participant[], map: Map): Promise<Match> {
    const match = new Match();
    match.map = Promise.resolve(map);
    match.participants = participants;

    return this.matchRepository.save(match);
  }

  public async findMatch (id: number): Promise<Match> {
    return this.matchRepository.findOne(id);
  }

  public async findMany (): Promise<Match[]> {
    return this.matchRepository.find();
  }
}
