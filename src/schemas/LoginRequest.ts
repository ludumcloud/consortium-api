import { IsNotEmpty, IsString } from 'class-validator';

export default class LoginRequest {

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
