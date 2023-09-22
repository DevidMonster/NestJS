import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ProductsModule } from './products/products.module';
import { CacheService } from './cache/cache.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cacheSerivce = app.get(CacheService);

  app.use(cookieParser());
  app.use(cors({ origin: true, credentials: true }));
  app.use(
    session({
      secret: 'abcdeghiklmnopqrstuvwxy',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 3600,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Products example')
    .setDescription('The Products API description')
    .setVersion('1.0')
    .addTag('Product', 'product api')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [ProductsModule],
  });
  SwaggerModule.setup('api/product', app, document);

  cacheSerivce.start();

  await app.listen(8000);
}
bootstrap();
