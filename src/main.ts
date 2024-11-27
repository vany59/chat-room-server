import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(compression());

  const configService = app.get(ConfigService);

  const trustedDomain = configService.get<string>('TRUSTED_DOMAIN');
  app.enableCors({
    origin: trustedDomain,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const port = configService.get<number>('PORT');
  await app.listen(port, '0.0.0.0');
  const appUrl = await app.getUrl();
  console.log(`Server is listening on ${appUrl}`);
}
bootstrap();
