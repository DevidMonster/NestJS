import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRateInput {
  @Field()
  id: number;

  @Field(() => Int)
  @IsNotEmpty()
  rate: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field(() => Int)
  @IsNotEmpty()
  userId: number;

  @Field(() => Int)
  @IsNotEmpty()
  productId: number;

  @Field(() => Int)
  @IsNotEmpty()
  orderId: number;
}
