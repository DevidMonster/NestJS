import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderDetailInput {
  @Field()
  id?: number;

  @Field(() => Int)
  @IsNotEmpty()
  cartId: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  orderId: number;
}
