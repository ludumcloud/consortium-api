import { createParamDecorator } from '@nestjs/common';
import Grid from '../models/Grid';

export default createParamDecorator((data, req): Grid => {
  return req.grid;
});
