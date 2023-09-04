import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments/comments.controller';
import { CommentsService } from './services/comments/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/entities/Comment';
import { Post } from 'src/typeorm/entities/Post';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment])],
  controllers: [CommentsController],
  providers: [CommentsService, UsersService],
})
export class CommentsModule {}
