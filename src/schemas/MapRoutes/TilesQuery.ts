import { Transform } from 'class-transformer';
import { IsNumber, Max } from 'class-validator';

export default class TilesQuery {

  @IsNumber()
  @Transform((num: string) => parseInt(num, 10))
  x: number;

  @IsNumber()
  @Transform((num: string) => parseInt(num, 10))
  y: number;

  @Max(25)
  @IsNumber()
  @Transform((num: string) => parseInt(num, 10))
  range: number;
}
