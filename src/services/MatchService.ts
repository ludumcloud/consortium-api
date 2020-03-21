import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import Map from '../models/Map';
import Match from '../models/Match';
import Participant from '../models/Participant';
import User from '../models/User';
import MatchRepository from '../repositories/MatchRepository';
import ParticipantRepository from '../repositories/ParticipantRepository';
import UserRepository from '../repositories/UserRepository';
import MapService, { MapCreationOptions } from './MapService';

@Injectable()
export default class MatchService {
  private readonly mapService: MapService;
  private readonly matchRepository: MatchRepository;
  private readonly userRepository: UserRepository;
  private readonly participantRepository: ParticipantRepository;

  constructor (
    matchRepository: MatchRepository,
    participantRepository: ParticipantRepository,
    userRepository: UserRepository,
    mapService: MapService
  ) {
    this.participantRepository = participantRepository;
    this.matchRepository = matchRepository;
    this.userRepository = userRepository;
    this.mapService = mapService;
  }

  public async createMatch (owner: number, participantIds: number[], mapOptions?: MapCreationOptions): Promise<Match> {
    // add the owner to the list of participants
    participantIds.push(owner);
    const users: User[] = await this.userRepository.fetchUsersById(_.uniq(participantIds));
    const participants: Participant[] = await Promise.all(users.map((user) =>
      this.participantRepository.createParticipant(user)
    ));

    const map: Map = await this.mapService.createMap(mapOptions);
    return this.matchRepository.createMatch(participants, map);
  }

  public async findMatch (id: number): Promise<Match> {
    const match: Match = await this.matchRepository.findMatch(id);
    const map: Map = await match.map;
    await map.tiles;

    return match;
  }

  public async findAllMatches (userId: number): Promise<Match[]> {
    let matches: Match[] = await this.matchRepository.findMany(userId);
    matches = await Promise.all(
      matches.map(async (match: Match) => this.matchRepository.findMatch(match.id))
    );
    return matches;
  }
}
