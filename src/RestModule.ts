import { Module } from '@nestjs/common';
import { HelloWorldController} from './controllers/HelloWorldController';

@Module({
  imports: [],
  controllers: [HelloWorldController],
  providers: [],
})
export class RestModule {}
