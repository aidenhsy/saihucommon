import { Request } from '@nestjs/common';

export interface User {
  sub: number;
  mobile: string;
  name: string;
  iat: number;
}

export interface CustomRequest extends Request {
  user: User;
}
