import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => Int)
  id: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  userName!: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty()
  @IsStrongPassword()
  passWord!: string;

  @Field()
  @IsString()
  phoneNumber?: string;

  @Field()
  @IsString()
  address?: string;

  @Field()
  @IsString()
  avatar?: string;

  @Field()
  @IsString()
  role!: string;

  @Field()
  @IsBoolean()
  state!: boolean;
}
