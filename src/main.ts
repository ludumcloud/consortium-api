import { NestFactory } from '@nestjs/core';
import { RestModule } from './RestModule';

async function bootstrap() {
  const app = await NestFactory.create(RestModule);
  await app.listen(3000);
}

bootstrap();
