// src/seed/seed.module.ts

import { Module }      from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService }      from './seed.service';
import { Especialidade }    from '../especialidades/especialidade.entity';
import { Doctor }           from '../doctor/doctor.entity';
import { Clinica } from 'src/clinicas/clinica.entity';
import { Patient } from 'src/patients/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Especialidade,
      Doctor,
      Clinica,
      Patient
    ])
  ],
  providers: [SeedService],
  exports:   [SeedService]
})
export class SeedModule {}
