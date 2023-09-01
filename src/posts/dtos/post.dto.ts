/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePost {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  subTitle?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  thumbnail?: string;
}

export class UpdatePost {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  subTitle?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  thumbnail?: string;
}
