import { IsArray, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export default class CreateMatchRequest {
  @IsArray()
  public participants: number[];

  @IsString()
  @IsOptional()
  public seed: string;

  @Min(0)
  @Max(10)
  @IsNumber()
  @IsOptional()
  public exponent: number;

  @Min(0)
  @Max(30)
  @IsNumber()
  @IsOptional()
  public height: number;

  @Min(0)
  @Max(30)
  @IsNumber()
  @IsOptional()
  public width: number;
}
