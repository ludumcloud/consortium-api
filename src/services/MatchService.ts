import { Injectable } from '@nestjs/common';
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

  public async createMatch (participantIds: number[], mapOptions?: MapCreationOptions): Promise<Match> {
    const users: User[] = await this.userRepository.fetchUsersById(participantIds);
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

  public async findAllMatches (): Promise<Match[]> {
    return this.matchRepository.findMany();
  }
}