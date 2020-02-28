import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import Participant from '../models/Participant';
import User from '../models/User';

@Injectable()
export default class ParticipantRepository {
  private readonly participantRepository: Repository<Participant>;

  constructor () {
    this.participantRepository = getRepository(Participant);
  }

  createParticipant (user: User) {
    const participant: Participant = new Participant();
    participant.user = user;

    return this.participantRepository.save(participant);
  }
}
