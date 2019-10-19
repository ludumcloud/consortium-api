import { NestApplication, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { RestModule } from './RestModule';
import logger from './utils/log';

async function bootstrap () {
  const app: NestApplication = await NestFactory.create(RestModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  await app.listen(3000);
}

createConnection()
  .catch((error: Error) => {
    logger.error('Failed to create database connection', error);
    throw error;
  })
  .then(() => bootstrap());
