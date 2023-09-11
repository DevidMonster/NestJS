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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartItem,
      Cart,
      Product,
      User,
      Order,
      OrderDetail,
    ]),
  ],
  providers: [CartItemsResolver, CartItemsService, UsersService],
  controllers: [CartItemsController],
  exports: [CartItemsService],
})
export class CartItemsModule {}
