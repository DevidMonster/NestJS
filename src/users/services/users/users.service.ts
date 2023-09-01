import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { IResponse } from 'src/types/response';
import { ISubmit } from 'src/users/dtos/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async findAllUsers(): Promise<IResponse<User[], undefined>> {
    const users = await this.user.find();

    if (!users) throw new HttpException('No users found', HttpStatus.NOT_FOUND);

    return { message: 'Find Users success', data: users };
  }

  async findOneUser(id: number): Promise<IResponse<User, undefined>> {
    const user = await this.user.findOne({ where: { id } });

    if (!user) throw new HttpException('No user found', HttpStatus.NOT_FOUND);

    return { message: 'Find User success', data: user };
  }

  async updateUser(
    id: number,
    userInfo: ISubmit,
  ): Promise<IResponse<User, undefined>> {
    await this.user.update(id, userInfo);

    const user = await this.user.findOne({ where: { id } });

    return { message: 'Update user success', data: user };
  }

  async createUser(
    userInfo: ISubmit,
  ): Promise<IResponse<undefined, undefined>> {
    await this.user.insert(userInfo);

    return { message: 'Create user success' };
  }
}
