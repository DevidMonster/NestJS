import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderDetailsService } from './order-details.service';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';

@Resolver(() => OrderDetail)
export class OrderDetailsResolver {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Mutation(() => OrderDetail)
  createOrderDetail(
    @Args('createOrderDetailInput')
    createOrderDetailInput: CreateOrderDetailInput,
  ) {
    return this.orderDetailsService.create(createOrderDetailInput);
  }

  @Query(() => [OrderDetail], { name: 'orderDetails' })
  findAll() {
    return this.orderDetailsService.findAll();
  }
}
