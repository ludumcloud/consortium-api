import { Module } from '@nestjs/common';
import AuthController from './controllers/AuthController';
import { HelloWorldController} from './controllers/HelloWorldController';

@Module({
  imports: [],
  controllers: [
    AuthController,
    HelloWorldController
  ],
  providers: [],
})
export class RestModule {}
