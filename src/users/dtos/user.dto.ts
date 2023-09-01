/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsBooleanString,
  IsStrongPassword,
} from 'class-validator';

export class ISubmit {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  phoneNumber?: string;

  @IsNotEmpty()
  @IsStrongPassword()
  passWord?: string;

  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsBooleanString()
  state: boolean;
}
