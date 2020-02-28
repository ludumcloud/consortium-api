import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repositories';
import MapService from './MapService';
import MatchService from './MatchService';

@Module({
  imports: [
    RepositoryModule
  ],
  providers: [
    MapService,
    MatchService
  ],
  exports: [
    MapService,
    MatchService
  ]
})
class ServicesModule {}

export {
  MatchService,
  MapService,
  ServicesModule
};
