import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { createConnection } from 'typeorm';
import { RestModule } from './RestModule';
import logger from './utils/log';

async function bootstrap () {
  const app: NestApplication = await NestFactory.create(RestModule);
  app.use(helmet());
  app.use(cors({
      origin: true,
      methods: ['GET', 'PUT', 'POST']
  }));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  await app.listen(3000);
}

createConnection()
  .catch((error: Error) => {
    logger.error('Failed to create database connection', error);
    throw error;
  })
  .then(() => bootstrap());
