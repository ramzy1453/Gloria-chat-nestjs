import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { PrismaExceptionFilter } from './filters';
import * as morgan from 'morgan';
import * as siofu from 'socketio-file-upload';

async function runApp() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: '*' });
  app.use([cookieParser(), morgan('tiny'), siofu.router]);
  app.useGlobalFilters(new PrismaExceptionFilter(app.getHttpAdapter()));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(8000);
}
runApp();
