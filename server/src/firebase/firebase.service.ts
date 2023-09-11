import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SignInInput } from 'src/auth/dto/signin.input';
import { SignUpInput } from 'src/auth/dto/singup.input';

@Injectable()
export class FirebaseService {
  private readonly firebaseAdmin: admin.app.App;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const serviceAccount = require('../serviceAccountKey.json') || {};
    if (!admin.apps.length) {
      this.firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      this.firebaseAdmin = admin.app();
    }
  }

  getAdmin(): admin.app.App {
    return this.firebaseAdmin;
  }

  async getUsers(): Promise<any> {
    try {
      // Ví dụ: Lấy danh sách người dùng
      const listUsers = await this.firebaseAdmin.auth().listUsers();
      return listUsers;
    } catch (error) {
      throw new Error('Lỗi khi truy cập Firebase');
    }
  }

  async userSignUp(userInfo: SignUpInput): Promise<any> {
    try {
      const user = await this.firebaseAdmin.auth().createUser({
        email: userInfo.email,
        password: userInfo.passWord,
        emailVerified: false,
        disabled: false,
      });
      return user;
    } catch (error) {
      throw new Error('Lỗi khi truy cập Firebase');
    }
  }

  async userLogin(userInfo: SignInInput): Promise<any> {
    try {
      const user = await this.firebaseAdmin
        .auth()
        .getUserByEmail(userInfo.email);
      return user;
    } catch (error) {
      throw new Error('Lỗi khi truy cập Firebase');
    }
  }
}
