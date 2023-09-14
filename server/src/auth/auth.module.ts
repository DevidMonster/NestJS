import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { CartService } from 'src/cart/cart.service';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SessionSerializer } from './utils/Serializer';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, CartItem])],
  providers: [
    AuthService,
    CartService,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
