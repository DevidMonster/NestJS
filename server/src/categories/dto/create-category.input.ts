import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field()
  id!: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  name!: string;
}
