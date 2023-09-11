import { SignInInput } from './signin.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class SignUpInput extends PartialType(SignInInput) {
  @Field()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  phoneNumber?: string;

  @Field()
  @IsNotEmpty()
  @IsStrongPassword()
  passWord: string;

  @Field()
  @IsNotEmpty()
  confirmPassword: string;

  @Field()
  avatar?: string;
}
