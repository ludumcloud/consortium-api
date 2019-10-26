import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class MapBody {
  @IsOptional()
  @IsNumber()
  width: number;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsString()
  seed: string;

  @IsOptional()
  @IsNumber()
  exponent: number;
}
