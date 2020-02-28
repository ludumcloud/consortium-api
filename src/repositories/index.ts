import { Module } from '@nestjs/common';
import MapRepository from './MapRepository';
import MatchRepository from './MatchRepository';
import ParticipantRepository from './ParticipantRepository';
import TileRepository from './TileRepository';
import UserRepository from './UserRepository';

@Module({
  providers: [
    MapRepository,
    MatchRepository,
    ParticipantRepository,
    TileRepository,
    UserRepository
  ],
  exports: [
    MapRepository,
    MatchRepository,
    ParticipantRepository,
    TileRepository,
    UserRepository
  ]
})
class RepositoryModule {}

export {
  MapRepository,
  MatchRepository,
  ParticipantRepository,
  RepositoryModule,
  TileRepository,
  UserRepository
};
