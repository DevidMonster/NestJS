import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsResolver } from './order-details.resolver';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Order, OrderDetail, Cart, CartItem]),
  ],
  providers: [OrderDetailsResolver, OrderDetailsService],
  controllers: [OrderDetailsController],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}