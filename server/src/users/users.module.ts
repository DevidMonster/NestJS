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
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, CartItem, Order])],
  controllers: [UsersController],
  providers: [UsersResolver, UsersService, CartService, FirebaseService],
  exports: [UsersService],
})
export class UsersModule {}
