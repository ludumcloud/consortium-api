import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repositories';
import MapService from './MapService';
import MatchService from './MatchService';
import SearchService from './SearchService';

@Module({
  imports: [
    RepositoryModule
  ],
  providers: [
    MapService,
    MatchService,
    SearchService
  ],
  exports: [
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
