import { createParamDecorator } from '@nestjs/common';
import Grid from '../models/Map';

export default createParamDecorator((data, req): Grid => {
  return req.grid;
});
