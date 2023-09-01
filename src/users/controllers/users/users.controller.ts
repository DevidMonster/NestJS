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
} from '@nestjs/common';
import { ISubmit } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/services/users/users.service';

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
