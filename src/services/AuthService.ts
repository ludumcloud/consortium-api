import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as util from 'util';
import User from '../models/User';
import { UserRepository } from '../repositories';
import { createSalt, hashPassword, passwordEqual, signature } from '../utils/authenticationHelper';
import { InvalidCredentialsException, InvalidTokenException } from '../utils/errors';
import logger from '../utils/log';
import SearchService from './SearchService';

export interface TokenPayload {
  id: number;
  email: string;
  name: string;
  username: string;
}

@Injectable()
export default class AuthService {
  private readonly userRepository: UserRepository;
  private readonly searchService: SearchService;

  constructor (userRepository: UserRepository, searchService: SearchService) {
    this.userRepository = userRepository;
    this.searchService = searchService;
  }

  public async loginUser (email: string, password: string): Promise<string> {
    let userRecord: User;
    try {
      userRecord = await this.userRepository.findByEmail(email);
    } catch (error) {
      logger.error('Failed to fetch user when logging in', error);
      throw error;
    }

    if (!userRecord) {
      throw new InvalidCredentialsException('Invalid username or password');
    }

    const isEqual: boolean = await passwordEqual(password, userRecord.password, userRecord.salt);
    if (!isEqual) {
      throw new InvalidCredentialsException('Invalid username or password');
    }

    const data: TokenPayload = {
      id: userRecord.id,
      email: userRecord.email,
      name: userRecord.name,
      username: userRecord.username
    };

    return jwt.sign({ data }, signature, { expiresIn: '6h' });
  }

  public async createUser (email: string, username: string, name: string, password: string): Promise<string> {
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
      throw error;
    }

    try {
      await this.searchService.addUserToIndex(user);
    } catch (error) {
      logger.error('Failed to add user to search index', error);
      throw error;
    }

    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username
    };

    return jwt.sign({ data: payload } , signature, { expiresIn: '6h' });
  }

  public async validateSession (token: string): Promise<User> {
    let data: any;
    try {
      data = await util.promisify(jwt.verify)(token, signature);
    } catch (error) {
      logger.debug('Failed to validate jwt session', error);
      throw new InvalidTokenException('Failed to validate jwt sessions');
    }

    const payload: TokenPayload = data?.data;
    if (!payload) {
      throw new InvalidTokenException('jwt session missing required parameters');
    }

    let user: User;
    try {
      user = await this.userRepository.fetchUserById(payload.id);
    } catch (error) {
      logger.error('Failed to fetch user for jwt session', error);
      throw error;
    }

    return user;
  }
}
