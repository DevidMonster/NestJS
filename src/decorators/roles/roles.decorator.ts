import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/typeorm/role.enum';

export const ROLES_KEY = 'role';
export const Roles = (args: Role) => SetMetadata(ROLES_KEY, args);
