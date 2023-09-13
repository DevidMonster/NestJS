import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateResolver } from './rate.resolver';
import { RateController } from './rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { UsersService } from 'src/users/users.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Rate, Product, User, Order, OrderDetail]),
  ],
  providers: [RateResolver, RateService, UsersService],
  controllers: [RateController],
})
export class RateModule {}
