import { IsEnum } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { OrderStatus } from 'src/types/orderStatus.enum';

@InputType()
export class UpdateOrderInput {
  @Field()
  id: number;

  @Field()
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}
