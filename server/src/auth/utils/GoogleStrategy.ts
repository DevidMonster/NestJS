/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        '993869343536-bcpofrvogbgje20os0n6ov9t0sftuuf9.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8000/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log({
      accessToken,
      refreshToken,
      profile,
    });
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });
    delete user.passWord;
    
    const token = this.authService.createToken(user.id)
    console.log(token);
    
    return user
      ? {
          accessToken: token,
          data: user,
        }
      : null;
  }
}
