import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import AuthController from './controllers/AuthController';
import MatchController from './controllers/MatchController';
import SearchController from './controllers/SearchController';
import { AuthenticationMiddleware } from './middleware/AuthenticationMiddleware';
import { RepositoryModule } from './repositories';
import { ServicesModule } from './services';

@Module({
  imports: [
    RepositoryModule,
    ServicesModule
  ],
  controllers: [
    AuthController,
    MatchController,
    SearchController
  ]
})
export class RestModule implements NestModule {
  configure (consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude({ path: '/v1/auth/(.*)', method: RequestMethod.ALL })
      .forRoutes(
{ path: '/v1/search', method: RequestMethod.ALL },
        { path: '/v1/match', method: RequestMethod.ALL },
        { path: 'v1/auth/info', method: RequestMethod.GET }
      );
  }
}
