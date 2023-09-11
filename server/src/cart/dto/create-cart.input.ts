import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCartInput {
  @Field(() => Int)
  @IsNotEmpty()
  userId: number;
}
