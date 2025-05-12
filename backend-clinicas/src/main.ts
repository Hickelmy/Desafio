import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const port = config.get<number>('PORT') || 3000;

  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true
  });

  await app.listen(port);
  console.log(`🚀 Backend rodando na porta ${port}`);
}

bootstrap();
