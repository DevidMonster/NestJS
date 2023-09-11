import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => Int)
  id: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  price: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @Field()
  image?: string;

  @Field(() => Int)
  @IsInt()
  discount: number;

  @Field(() => Int)
  categoryId: number;
}
