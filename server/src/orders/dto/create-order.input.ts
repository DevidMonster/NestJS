import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateOrderDetailInput } from 'src/order-details/dto/create-order-detail.input';

@InputType()
export class CreateOrderInput extends PartialType(CreateOrderDetailInput) {
  @Field()
  id!: number;

  @Field(() => Int)
  @IsNotEmpty()
  userId: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  userName!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  shippingAddress!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  paymentMethod!: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  totalAmount!: number;
}
