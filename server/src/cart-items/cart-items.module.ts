import { CategoriesService } from './../categories/categories.service';
import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsResolver } from './cart-items.resolver';
import { CartItemsController } from './cart-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Order } from 'src/orders/entities/order.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { ProductsService } from 'src/products/products.service';
import { CommentsService } from 'src/comments/comments.service';
import { Comment } from 'src/comments/entities/comment.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Rate } from 'src/rate/entities/rate.entity';
import { RateService } from 'src/rate/rate.service';
import { CacheService } from 'src/cache/cache.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartItem,
      Cart,
      Product,
      User,
      Order,
      OrderDetail,
      Comment,
      Category,
      Rate,
    ]),
  ],
  providers: [
    CartItemsResolver,
    CartItemsService,
    UsersService,
    ProductsService,
    CommentsService,
    CategoriesService,
    RateService,
    CacheService,
  ],
  controllers: [CartItemsController],
  exports: [CartItemsService],
})
export class CartItemsModule {}
