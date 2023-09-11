import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.user.find();

    if (!users) throw new HttpException('No users found', HttpStatus.NOT_FOUND);

    return users;
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.user.findOne({ where: { id } });

    if (!user) throw new HttpException('No user found', HttpStatus.NOT_FOUND);

    return user;
  }

  async updateUser(id: number, userInfo: UpdateUserInput): Promise<User> {
    await this.user.update(id, userInfo);

    const user = await this.user.findOne({ where: { id } });

    return user;
  }

  async createUser(userInfo: CreateUserInput): Promise<User> {
    const user = this.user.create(userInfo);

    await this.user.save(user);

    return user;
  }
}
