import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import MapRepository from './MapRepository';
import MatchRepository from './MatchRepository';
import ParticipantRepository from './ParticipantRepository';
import SearchRepository from './SearchRepository';
import TileRepository from './TileRepository';
import UserRepository from './UserRepository';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  providers: [
    MapRepository,
    MatchRepository,
    ParticipantRepository,
    SearchRepository,
    TileRepository,
    UserRepository
  ],
  exports: [
    MapRepository,
    MatchRepository,
    ParticipantRepository,
    SearchRepository,
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
  SearchRepository,
  TileRepository,
  UserRepository
};
