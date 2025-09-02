import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import { ExpressSessionStorage } from './session/ExpressSessionStorage';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5000', 'http://localhost:9000'],
    credentials: true,
  });

  const sessionStore = app.get(ExpressSessionStorage, { strict: false });

  app.use(
    session({
      secret: 'goals-secret',
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 60 * 60 * 1000,
      },
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
