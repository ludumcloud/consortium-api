import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { LoginRequest, SignUpRequest } from '../schemas';
import { createSalt, hashPassword, passwordEqual, signature } from '../utils/authenticationHelper';

@Controller('/v1/auth')
export default class AuthController {

  @Post('/login')
  public async login (@Body() body: LoginRequest): Promise<void> {
    const { email, password } = body;
    const userRecord = await User.findOne({ email });

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

    let user = await User.findOne({ email });
    if (user) {
      throw new HttpException(`The following email address is not valid ${email}`, HttpStatus.BAD_REQUEST);
    }
    const salt = await createSalt();
    const hashedPassword: string = await hashPassword(password, salt);

    user = new User();
    user.email = email;
    user.username = username;
    user.salt = salt;
    user.password = hashedPassword;
    user.name = name;

    await user.save();

    return {
      email: user.email,
      name: user.name,
      username: user.username
    };
  }
}
