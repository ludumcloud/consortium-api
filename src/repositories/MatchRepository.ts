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

  public async findMany (userId: number): Promise<Match[]> {
    // this query only returns the ids, not the actually matches, so we have to run another query
    const matches: Match[] = await this.matchRepository.createQueryBuilder('match')
      .leftJoin('match.participants', 'participant')
      .leftJoin('participant.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    return Promise.all(
      matches.map((match: Match) => this.matchRepository.findOne(match.id))
    );
  }
}
