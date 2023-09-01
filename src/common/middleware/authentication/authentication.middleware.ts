import { NextFunction, Request, Response } from 'express';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('token ', req.cookies.jwt);

    if (!req.cookies?.jwt)
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    next();
  }
}
