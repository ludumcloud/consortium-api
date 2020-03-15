import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repositories';
import AuthService from './AuthService';
import MapService from './MapService';
import MatchService from './MatchService';
import SearchService from './SearchService';

@Module({
  imports: [
    RepositoryModule
  ],
  providers: [
    AuthService,
    MapService,
    MatchService,
    SearchService
  ],
  exports: [
    AuthService,
    MapService,
    MatchService,
    SearchService
  ]
})
class ServicesModule {}

export {
  MatchService,
  MapService,
  SearchService,
  ServicesModule
};
