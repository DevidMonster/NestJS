import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IResponse } from 'src/types/response';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CartService } from 'src/cart/cart.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private cartService: CartService,
    private firebaseService: FirebaseService,
  ) {}

  @Get()
  async getAllUsers(): Promise<IResponse<User[], undefined>> {
    // const users = await this.userService.findAllUsers();
    const users = await this.firebaseService.getUsers();
    return { message: 'Find All users', data: users };
  }

  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<User, undefined>> {
    const user = await this.userService.findOneUser(id);
    return { message: 'Find User', data: user };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() rqData: CreateUserInput,
  ): Promise<IResponse<User, undefined>> {
    const user = await this.userService.createUser(rqData as User);
    await this.cartService.create({ userId: user.id });
    return { message: 'Create User', data: user };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() rqData: UpdateUserInput,
  ): Promise<IResponse<User, undefined>> {
    const user = await this.userService.updateUser(id, rqData as User);
    return { message: 'Update User', data: user };
  }
}
