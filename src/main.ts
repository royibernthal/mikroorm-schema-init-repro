import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule, utilities } from 'nest-winston';
import { transports, format } from 'winston';

import { AppModule } from './app.module';
import { getEnv } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useLogger(
    WinstonModule.createLogger({
      transports: new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.ms(),
          utilities.format.nestLike('repro', {
            prettyPrint: true,
            colors: true,
          }),
        ),
      }),
    }),
  );

  app.enableVersioning({ type: VersioningType.URI });

  await app.listen(getEnv().port);
}

bootstrap();
