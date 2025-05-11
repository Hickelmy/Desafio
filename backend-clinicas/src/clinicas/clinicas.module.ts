import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClinicasController } from './clinicas.controller';
import { ClinicasService } from './clinicas.service';
import { Clinica } from './clinica.entity';
import { Especialidade } from 'src/especialidades/especialidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinica, Especialidade])],
  controllers: [ClinicasController],
  providers: [ClinicasService],
})
export class ClinicasModule {}
