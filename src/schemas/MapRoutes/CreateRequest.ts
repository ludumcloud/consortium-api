import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class CreateRequest {
  @IsOptional()
  @IsNumber()
  width: number;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsString()
  seed: string;
}
