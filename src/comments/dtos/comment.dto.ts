/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class IComment {
  @IsNotEmpty()
  @IsNumberString()
  postId: string | number;

  @IsNotEmpty()
  @IsNumberString()
  userId: string | number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
