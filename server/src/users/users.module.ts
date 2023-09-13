import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartService } from 'src/cart/cart.service';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Rate } from 'src/rate/entities/rate.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Cart,
      Product,
      CartItem,
      Order,
      Rate,
      Category,
      Comment,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersResolver, UsersService, CartService],
  exports: [UsersService],
})
export class UsersModule {}
