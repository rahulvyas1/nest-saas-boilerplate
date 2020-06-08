import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as compression from 'compression';
import * as RateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(
      RateLimit({
          windowMs: 15 * 60 * 1000, // 15 minutes
          max: 100, // limit each IP to 100 requests per windowMs
      }),
  );
  app.use(compression());
  app.use(morgan('combined'));

  await app.listen(3000);
}
bootstrap();
