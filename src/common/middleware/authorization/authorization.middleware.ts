import { NextFunction, Request, Response } from 'express';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.jwt;

    const { id } = jwt.verify(token, process.env.SERECT_KEY) as { id: number };

    const user = await this.userService.findOneUser(id);

    if (!user)
      throw new HttpException('Unauthenticated user', HttpStatus.UNAUTHORIZED);

    if (user.data.role !== 'admin')
      throw new HttpException('User is not admin', HttpStatus.UNAUTHORIZED);

    next();
  }
}
