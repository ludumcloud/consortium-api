import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import User from '../models/User';

export const UserParam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: Request & { user: User } = ctx.switchToHttp().getRequest();
  return request.user;
});
