import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbUrl = config.get<string>('DATABASE_URL');

        if (!dbUrl) {
          Logger.error('DATABASE_URL não definida no ambiente.');
          throw new Error('DATABASE_URL is missing.');
        }

        return {
          type: 'postgres',
          url: dbUrl,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),

    AuthModule,
    UsersModule,
    ClinicasModule,
    EspecialidadeModule,
    SeedModule,
    PatientsModule,
    DoctorModule,
  ],
})
export class AppModule {}
