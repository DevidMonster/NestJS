import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts/posts.controller';
import { PostsService } from './services/posts/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Comment } from 'src/typeorm/entities/Comment';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment])],
  controllers: [PostsController],
  providers: [PostsService, UsersService],
})
export class PostsModule {}
