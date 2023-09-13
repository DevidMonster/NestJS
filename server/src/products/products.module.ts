import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { Product } from './entities/product.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { ProductsController } from './products.controller';
import { Category } from 'src/categories/entities/category.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Rate } from 'src/rate/entities/rate.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Comment,
      Category,
      OrderDetail,
      Order,
      Rate,
      User,
    ]),
  ],
  providers: [ProductsResolver, ProductsService, UsersService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
