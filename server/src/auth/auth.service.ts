import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { SignUpInput } from './dto/singup.input';
import { SignInInput } from './dto/signin.input';
import { UserDetails } from 'src/types/userDetails';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    private cartService: CartService,
  ) {}

  async validateUser(details: UserDetails): Promise<User> {
    const user = await this.user.findOne({
      where: { email: details.email },
      relations: { cart: true },
    });

    if (user) return user;

    // Tạo mật khẩu ngẫu nhiên cho người dùng
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const newUser = this.user.create({
      email: details.email,
      userName: details.displayName,
      passWord: hashedPassword,
    });

    const userCreated = await this.user.save(newUser);

    //tạo giỏ hàng cho người dùng
    await this.cartService.create({ userId: userCreated.id });

    const userResult = await this.user.findOne({
      where: { id: userCreated.id },
      relations: { cart: true },
    });

    return userResult;
  }

  createToken(id: string | number): string {
    const token = jwt.sign({ id }, process.env.SERECT_KEY, {
      expiresIn: '1d',
    });
    return token;
  }

  async getToken(req: Request): Promise<{ accessToken: string; data: User }> {
    const token = req.cookies?.jwt;

    if (!token) throw new UnauthorizedException('Tokne timed out');

    const { id } = jwt.verify(token, process.env.SERECT_KEY) as { id: number };

    const user = await this.user.findOne({
      where: { id },
      relations: { cart: true },
    });

    return { accessToken: token, data: user };
  }

  async clearToken(req: Request, res: Response): Promise<Response> {
    const token = req.cookies?.jwt;
    if (!token) throw new HttpException('No Token found', HttpStatus.NOT_FOUND);

    res.clearCookie('jwt');

    return res.send({
      message: 'Token has been cleared',
    });
  }

  async register(
    userInfo: SignUpInput,
    res: Response,
  ): Promise<{
    message: string;
    accessToken: string;
    data: User;
  }> {
    if (userInfo.passWord !== userInfo.confirmPassword)
      throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);

    const userExsit = await this.user.findOne({
      where: { email: userInfo.email },
    });

    if (userExsit)
      throw new HttpException(
        'Email is already in use',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await bcrypt.hash(userInfo.passWord, 10);

    const { identifiers } = await this.user.insert({
      ...userInfo,
      passWord: hashPassword,
    });

    const token = this.createToken(identifiers[0]?.id);

    const user = await this.user.findOne({
      where: { id: identifiers[0]?.id },
      relations: { cart: true },
    });

    this.setTokenCookie(res, token);

    return {
      message: 'Signup success',
      accessToken: token,
      data: user,
    };
  }

  async login(userInfo: SignInInput, res: Response): Promise<Response> {
    const user = await this.user.findOne({
      where: { email: userInfo.email },
      relations: { cart: true },
    });

    if (!user) throw new HttpException('Email not found', HttpStatus.NOT_FOUND);

    if (!user.state) {
      throw new HttpException(
        'This account is disabled',
        HttpStatus.BAD_REQUEST,
      );
    }

    const valid = await bcrypt.compare(userInfo.passWord, user.passWord);

    if (!valid)
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);

    const token = this.createToken(user.id);

    this.setTokenCookie(res, token);

    return res.send({
      message: 'Signin success',
      accessToken: token,
      data: user,
    });
  }

  setTokenCookie(res: Response, token: string) {
    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      secure: true,
    });
  }
}
