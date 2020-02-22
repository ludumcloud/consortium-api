import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import AuthController from './controllers/AuthController';
import MapController from './controllers/MapController';
import MapMiddleware from './middleware/MapMiddleware';
import MapRepository from './repositories/MapRepository';
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
    MapRepository,
    TileRepository
  ],
})
export class RestModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(MapMiddleware)
      .forRoutes(
{ path: '/v1/map/:id/tiles', method: RequestMethod.GET }
      );
  }
}
