import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response} from 'express';
import User from '../models/User';
import AuthService from '../services/AuthService';
import logger from '../utils/log';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly authService: AuthService;

  constructor (authService: AuthService) {
    this.authService = authService;
  }

  async use (req: Request & { user?: User }, res: Response, next: (error?: Error) => void) {
    const bearer: string = req.headers.authorization as string;
    const token: string = bearer?.split(' ')[1];

    if (!token) {
      next(new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED));
    }

    let user: User;
    try {
      user = await this.authService.validateSession(token);
    } catch (error) {
      logger.debug('Failed to find user associated with token', error);
      next(new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED));
    }
    req.user = user;

    next();
  }
}
