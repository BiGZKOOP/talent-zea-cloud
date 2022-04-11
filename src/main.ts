import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';
global['fetch'] = require('node-fetch');
async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  app.enableCors();
  app.enableCors({
    origin: [
      configService.get('FRONTEND_URL'),
      configService.get('FRONTEND_URL_ADMIN'),
    ],
    credentials: true,
  });

  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  await app.listen(port, () => {
    console.log(`⛱ Talent Zea Cloud listening on port ${port}`);
    console.log('Press Ctrl+C to quit.');
  });
}
bootstrap();
