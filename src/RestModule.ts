import { Module } from '@nestjs/common';
import AuthController from './controllers/AuthController';
import MapController from './controllers/MapController';

@Module({
  imports: [],
  controllers: [
    AuthController,
    MapController
  ],
  providers: [],
})
export class RestModule {}
