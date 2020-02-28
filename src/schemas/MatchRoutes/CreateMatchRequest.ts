import { IsArray, IsOptional, IsString } from 'class-validator';

export default class CreateMatchRequest {
  @IsArray()
  public participants: number[];

  @IsString()
  @IsOptional()
  public seed: string;
}
