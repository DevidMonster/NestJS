import {
  Controller,
  Post,
  Body,
  Delete,
  Res,
  Req,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SignIn, Signup } from 'src/auth/dtos/auth.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('token')
  getToken(@Req() req: Request) {
    return this.authService.getToken(req);
  }

  @Delete('token')
  removeToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.clearToken(req, res);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async SignUp(@Body() userInfo: Signup, @Res() res: Response) {
    return await this.authService.register(userInfo, res);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async SignIn(@Body() userInfo: SignIn, @Res() res: Response) {
    return await this.authService.login(userInfo, res);
  }
}
