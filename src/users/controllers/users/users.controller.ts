import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
import { AuthortizationGuard } from 'src/guard/authortization/authortization.guard';
import { Role } from 'src/typeorm/role.enum';
import { ISubmit } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Roles(Role.Admin)
@UseGuards(AuthenticationGuard, AuthortizationGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  fetchUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  fetchOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneUser(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addUser(@Body() userInfo: ISubmit) {
    return this.userService.createUser(userInfo);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  editUser(@Param('id', ParseIntPipe) id: number, @Body() userInfo: ISubmit) {
    return this.userService.updateUser(id, userInfo);
  }
}
