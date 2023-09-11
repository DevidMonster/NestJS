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

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Order, OrderDetail, Product, User]),
  ],
  providers: [OrdersResolver, OrdersService, OrderDetailsService],
  controllers: [OrdersController],
})
export class OrdersModule {}
