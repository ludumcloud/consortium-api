import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import User from '../models/User';

export const UserParam = createParamDecorator((data: unknown, request: Request & { user: User }) => {
  return request.user;
});
