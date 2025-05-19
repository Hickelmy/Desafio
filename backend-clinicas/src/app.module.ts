import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClinicasModule } from './clinicas/clinicas.module';
import { SeedModule } from './seed/seed.module';
import { EspecialidadeModule } from './especialidades/especialidade.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
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
    EspecialidadeModule,
    SeedModule,
    PatientsModule,
    DoctorModule
  ],
})
export class AppModule {}
