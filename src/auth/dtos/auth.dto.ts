/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignIn {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  passWord: string;
}

export class Signup {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  phoneNumber?: string;

  @IsNotEmpty()
  @IsStrongPassword()
  passWord: string;

  @IsNotEmpty()
  confirmPassword: string;

  avatar?: string;
}
