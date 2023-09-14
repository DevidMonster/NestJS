import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { RateModule } from './rate/rate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { Comment } from './comments/entities/comment.entity';
import { User } from './users/entities/user.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart-items/entities/cart-item.entity';
import { Order } from './orders/entities/order.entity';
import { OrderDetail } from './order-details/entities/order-detail.entity';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseController } from './firebase/firebase.controller';
import { MulterModule } from '@nestjs/platform-express';
import { Rate } from './rate/entities/rate.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER,
      database: 'project2',
      password: process.env.DATABASE_PASSWORD,
      synchronize: true,
      logging: true,
      entities: [
        Product,
        Comment,
        User,
        Post,
        Category,
        Cart,
        CartItem,
        Order,
        OrderDetail,
        Rate,
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    PassportModule.register({ session: true }),
    ProductsModule,
    UsersModule,
    AuthModule,
    CommentsModule,
    RateModule,
    PostsModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    OrderDetailsModule,
    CartItemsModule,
  ],
  controllers: [FirebaseController],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class AppModule {}
