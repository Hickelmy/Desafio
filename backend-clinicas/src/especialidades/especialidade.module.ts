import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialidadeController } from './especialidade.controller';
import { Especialidade } from './especialidade.entity';
import { EspecialidadeService } from './especialidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([Especialidade])],
  controllers: [EspecialidadeController],
  providers: [EspecialidadeService],
  exports: [EspecialidadeService]
})
export class EspecialidadeModule {}
