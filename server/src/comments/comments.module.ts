import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { Product } from 'src/products/entities/product.entity';
import { Comment } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { CommentsController } from './comments.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Product, User])],
  providers: [CommentsResolver, CommentsService, UsersService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
