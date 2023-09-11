import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field()
  @IsNotEmpty()
  @IsString()
  name!: string;
}
