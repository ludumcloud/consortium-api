import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { createConnection } from 'typeorm';
import { RestModule } from './RestModule';
import logger from './utils/log';

async function bootstrap (port: number) {
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

  logger.debug(`Starting on port: ${port}`);
  await app.listen(port);
}

createConnection()
  .catch((error: Error) => {
    logger.error('Failed to create database connection', error);
    throw error;
  })
  .then(() => {
    // TODO: create helper to parse env params instead of doing it inline
    const port: number = parseInt(process.env.PORT, 10) || 3000;
    return bootstrap(port);
  });
