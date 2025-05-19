import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { SeedService } from './seed/seed.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port: number = configService.get<number>('PORT') ?? 3000;

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true
  });

  const seedService = app.get(SeedService);
  await seedService.run();

  await app.listen(port);
  console.log(`🚀 Backend rodando em http://localhost:${port}`);
}

bootstrap();
