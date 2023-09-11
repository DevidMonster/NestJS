import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
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
  avatar?: string;

  @Field()
  @IsString()
  role!: string;

  @Field()
  @IsBoolean()
  state!: boolean;
}
