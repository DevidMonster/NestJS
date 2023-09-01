import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Comment } from './typeorm/entities/Comment';
import { Post } from './typeorm/entities/Post';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthenticationMiddleware } from './common/middleware/authentication/authentication.middleware';
import { AuthModule } from './auth/auth.module';
import { AuthorizationMiddleware } from './common/middleware/authorization/authorization.middleware';

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER,
      database: 'mysql_project',
      password: process.env.DATABASE_PASSWORD,
      synchronize: true,
      logging: true,
      entities: [User, Comment, Post],
    }),
    UsersModule,
    CommentsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AuthorizationMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users/:id', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/:id', method: RequestMethod.PATCH },
        { path: 'posts', method: RequestMethod.POST },
        { path: 'posts/:id', method: RequestMethod.PATCH },
        { path: 'posts/:id', method: RequestMethod.DELETE },
        { path: 'comments', method: RequestMethod.POST },
        { path: 'comments/:id', method: RequestMethod.DELETE },
      )
      .apply(AuthorizationMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users/:id', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/:id', method: RequestMethod.PATCH },
        { path: 'posts', method: RequestMethod.POST },
        { path: 'posts/:id', method: RequestMethod.PATCH },
        { path: 'posts/:id', method: RequestMethod.DELETE },
        { path: 'comments/:id', method: RequestMethod.DELETE },
      );
  }
}
