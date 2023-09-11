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

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Comment, Category, OrderDetail, Order]),
  ],
  providers: [ProductsResolver, ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
