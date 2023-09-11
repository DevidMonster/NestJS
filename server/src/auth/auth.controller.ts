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
import { SignInInput } from './dto/signin.input';
import { SignUpInput } from './dto/singup.input';
import { AuthService } from './auth.service';
import { CartService } from 'src/cart/cart.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private firebaseService: FirebaseService,
  ) {}

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
  async SignUp(@Body() userInfo: SignUpInput, @Res() res: Response) {
    // const response = await this.authService.register(userInfo, res);
    // const user = response.data;
    // await this.cartService.create({ userId: user.id });
    // return res.status(200).json(response);
    const userResponse = await this.firebaseService.userSignUp(userInfo);
    return res.status(200).json(userResponse);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async SignIn(@Body() userInfo: SignInInput, @Res() res: Response) {
    // return await this.authService.login(userInfo, res);
    const user = await this.firebaseService.userLogin(userInfo);
    return res.status(200).json(user);
  }
}
