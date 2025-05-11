import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClinicasModule } from './clinicas/clinicas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // permite acesso a process.env globalmente
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'clinicas',
      synchronize: true,
      autoLoadEntities: true,
    }),

    AuthModule,
    UsersModule,
    ClinicasModule,
  ],
})
export class AppModule {}
