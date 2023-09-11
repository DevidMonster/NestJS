import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCartItemInput {
  @Field(() => Int)
  @IsNotEmpty()
  cartId: number;

  @Field(() => Int)
  @IsNotEmpty()
  productId!: number;

  @Field(() => Int)
  @IsNotEmpty()
  quantity: number;
}
