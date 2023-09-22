import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
@InputType()
export class CreateProductInput {
  @ApiProperty()
  @Field(() => Int)
  id: number;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @Field()
  image?: string;

  @ApiProperty()
  @Field(() => Int)
  @IsInt()
  discount: number;

  @ApiProperty()
  @Field(() => Int)
  categoryId: number;
}
