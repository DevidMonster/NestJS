import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
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
