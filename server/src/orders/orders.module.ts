import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { OrderDetailsService } from 'src/order-details/order-details.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { UsersService } from 'src/users/users.service';
import { CacheService } from 'src/cache/cache.service';
import { ProductsService } from 'src/products/products.service';
import { CommentsService } from 'src/comments/comments.service';
import { Comment } from 'src/comments/entities/comment.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Rate } from 'src/rate/entities/rate.entity';
import { RateService } from 'src/rate/rate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cart,
      Order,
      OrderDetail,
      Product,
      User,
      CartItem,
      Comment,
      Category,
      Rate,
    ]),
  ],
  providers: [
    OrdersResolver,
    OrdersService,
    OrderDetailsService,
    ProductsService,
    CommentsService,
    UsersService,
    CacheService,
    CategoriesService,
    RateService,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
