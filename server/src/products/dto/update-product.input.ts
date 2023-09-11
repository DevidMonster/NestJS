import { CreateProductInput } from './create-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
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
