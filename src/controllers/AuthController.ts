import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';
import { LoginRequest, SignUpRequest } from '../schemas';
import { createSalt, hashPassword, passwordEqual, signature } from '../utils/authenticationHelper';
import logger from '../utils/log';

@Controller('/v1/auth')
export default class AuthController {
  private readonly userRepository: UserRepository;

  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  @Post('/login')
  public async login (@Body() body: LoginRequest): Promise<void> {
    const { email, password } = body;

    let userRecord: User;
    try {
      userRecord = await this.userRepository.findByEmail(email);
    } catch (error) {
      logger.error('Failed to fetch user when logging in', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!userRecord) {
      throw new HttpException('Invalid username or password', HttpStatus.BAD_REQUEST);
    }

    const isEqual: boolean = await passwordEqual(password, userRecord.password, userRecord.salt);
    if (!isEqual) {
      throw new HttpException('Invalid username or password', HttpStatus.BAD_REQUEST);
    }

    const data: Record<string, string> = {
      email: userRecord.email,
      name: userRecord.name,
      username: userRecord.username
    };

    return jwt.sign({ data }, signature, { expiresIn: '6h' });
  }

  @Post('/signup')
  public async signUp (@Body() body: SignUpRequest): Promise<object> {
    const { username, email, password, name } = body;

    let user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new HttpException(`The following email address is not valid ${email}`, HttpStatus.BAD_REQUEST);
    }
    const salt = await createSalt();
    const hashedPassword: string = await hashPassword(password, salt);

    try {
      user = await this.userRepository.createUser(email, username, salt, hashedPassword, name);
    } catch (error) {
      logger.error('Failed to create user when attempting signup', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      email: user.email,
      name: user.name,
      username: user.username
    };
  }
}
