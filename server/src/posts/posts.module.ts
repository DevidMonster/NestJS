import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostsResolver, PostsService, UsersService],
  controllers: [PostsController],
})
export class PostsModule {}
