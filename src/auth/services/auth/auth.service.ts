import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { SignIn, Signup } from 'src/auth/dtos/auth.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  private createToken(id: string | number): string {
    const token = jwt.sign({ id }, process.env.SERECT_KEY, {
      expiresIn: '1d',
    });
    return token;
  }

  async getToken(req: Request): Promise<{ accessToken: string }> {
    const token = req.cookies?.jwt;
    return { accessToken: token || '' };
  }

  async clearToken(req: Request, res: Response): Promise<Response> {
    const token = req.cookies?.jwt;
    if (!token) throw new HttpException('No Token found', HttpStatus.NOT_FOUND);

    res.clearCookie('jwt');

    return res.send({
      message: 'Token has been cleared',
    });
  }

  async register(userInfo: Signup, res: Response): Promise<Response> {
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
    });

    delete user.passWord;

    this.setTokenCookie(res, token);

    return res.send({
      message: 'Signup success',
      accessToken: token,
      data: user,
    });
  }

  async login(userInfo: SignIn, res: Response): Promise<Response> {
    const user = await this.user.findOne({
      where: { email: userInfo.email },
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

    delete user.passWord;

    this.setTokenCookie(res, token);

    return res.send({
      message: 'Signin success',
      accessToken: token,
      data: user,
    });
  }

  private setTokenCookie(res: Response, token: string) {
    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      secure: true,
    });
  }
}
