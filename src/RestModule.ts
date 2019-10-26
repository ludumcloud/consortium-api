import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import AuthController from './controllers/AuthController';
import MapController from './controllers/MapController';
import GridMiddleware from './middleware/GridMiddleware';
import GridRepository from './repositories/GridRepository';
import TileRepository from './repositories/TileRepository';
import UserRepository from './repositories/UserRepository';

@Module({
  imports: [],
  controllers: [
    AuthController,
    MapController
  ],
  providers: [
    UserRepository,
    GridRepository,
    TileRepository
  ],
})
export class RestModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(GridMiddleware)
      .forRoutes(
{ path: '/v1/map/:id/tiles', method: RequestMethod.GET }
      );
  }
}
