import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { RestModule } from './RestModule';

async function bootstrap () {
  const app = await NestFactory.create(RestModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

createConnection()
  .catch((error) => {
    console.error('Failed to create database connection', error);
    throw error;
  })
  .then(() => bootstrap());
