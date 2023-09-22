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
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SignInInput } from './dto/signin.input';
import { SignUpInput } from './dto/singup.input';
import { AuthService } from './auth.service';
import { CartService } from 'src/cart/cart.service';
import { GoogleAuthGuard } from 'src/guard/google-auth/google-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
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
    const response = await this.authService.register(userInfo, res);
    const user = response.data;
    await this.cartService.create({ userId: user.id });
    return res.status(200).json(response);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async SignIn(@Body() userInfo: SignInInput, @Res() res: Response) {
    return await this.authService.login(userInfo, res);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() req: Request, @Res() res: Response) {
    this.authService.setTokenCookie(res, req.user?.accessToken);
    // res.json({ message: 'Login success', ...req?.user });
    res.redirect('http://localhost:5174/');
  }
}
