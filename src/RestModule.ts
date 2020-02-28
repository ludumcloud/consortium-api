import { Module } from '@nestjs/common';
import AuthController from './controllers/AuthController';
import MatchController from './controllers/MatchController';
import { RepositoryModule } from './repositories';
import { ServicesModule } from './services';

@Module({
  imports: [
    RepositoryModule,
    ServicesModule
  ],
  controllers: [
    AuthController,
    MatchController
  ]
})
export class RestModule {}
