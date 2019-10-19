import { Module } from '@nestjs/common';
import AuthController from './controllers/AuthController';

@Module({
  imports: [],
  controllers: [
    AuthController
  ],
  providers: [],
})
export class RestModule {}
