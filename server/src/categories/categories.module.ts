import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Comment } from 'src/comments/entities/comment.entity';
import { Rate } from 'src/rate/entities/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, User, Comment, Rate])],
  providers: [CategoriesResolver, CategoriesService, UsersService],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
