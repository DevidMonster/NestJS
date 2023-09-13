import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
// import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.cookies?.jwt;
      if (!token) {
        throw new UnauthorizedException(
          'Logged in as a user without authorization credentials',
        );
      }

      const { id } = jwt.verify(token, process.env.SERECT_KEY) as {
        id: number;
      };

      const user = await this.userService.findOneUser(id);
      if (!user) {
        throw new UnauthorizedException('user not found');
      }

      request.user = user;
      // console.log(request.user);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }
}
