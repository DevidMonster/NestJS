import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePostInput } from './create-post.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field()
  id!: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Field()
  subTitle?: string;

  @Field()
  thumbnail?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  content!: string;
}
