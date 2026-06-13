import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: [
      configService.get('FRONTEND_URL', 'http://localhost:3000'),
      'https://bharatkart.vercel.app',
    ],
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global prefix - exclude health check for Railway
  app.setGlobalPrefix('api/v1', {
    exclude: ['health'],
  });

  const port = configService.get('PORT', 4000);
  await app.listen(port);

  console.log(`🚀 BharatKart API running on port ${port}`);
}

bootstrap();
