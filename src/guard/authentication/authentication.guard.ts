import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.cookies?.jwt;
      if (!token) {
        throw new UnauthorizedException();
      }

      const { id } = jwt.verify(token, process.env.SERECT_KEY) as {
        id: number;
      };

      const { data } = await this.userService.findOneUser(id);
      if (!data) {
        throw new UnauthorizedException();
      }

      request.user = data;
      // console.log(request.user);
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
