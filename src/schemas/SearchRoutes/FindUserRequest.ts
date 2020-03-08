import { MaxLength, MinLength } from 'class-validator';

export default class FindUserRequest {
  @MinLength(3)
  @MaxLength(50)
  public query: string;
}
