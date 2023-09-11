import { IsNotEmpty } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCartItemInput {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  @IsNotEmpty()
  quantity: number;
}
