import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { UserParam } from '../decorators/UserDecorator';
import User from '../models/User';
import { LoginRequest, SignUpRequest } from '../schemas';
import AuthService from '../services/AuthService';
import { InvalidCredentialsException } from '../utils/errors';

@Controller('/v1/auth')
export default class AuthController {
  private readonly authService: AuthService;

  constructor (authService: AuthService) {
    this.authService = authService;
  }

  @Post('/login')
  public async login (@Body() body: LoginRequest): Promise<string> {
    const { email, password } = body;

    let session: string;
    try {
      session = await this.authService.loginUser(email, password);
    } catch (error) {
      if (error instanceof InvalidCredentialsException) {
        throw new HttpException('Invalid username or password', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return session;
  }

  @Post('/signup')
  public async signUp (@Body() body: SignUpRequest): Promise<string> {
    const { username, email, password, name } = body;

    let session: string;
    try {
      session = await this.authService.createUser(email, username, name, password);
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return session;
  }

  @Get('/info')
  @UseInterceptors(ClassSerializerInterceptor)
  public async info (@UserParam() user: User): Promise<User> {
    return user;
  }
}
