import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
// import { UsersService } from 'src/users/services/users/users.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/typeorm/role.enum';

@Injectable()
export class AuthortizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    // console.log(request.user, requiredRoles);
    const role = request.user.role;
    if (requiredRoles !== role) return false;

    return true;
  }
}
