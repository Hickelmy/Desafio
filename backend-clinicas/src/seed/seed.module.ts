import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidade } from '../especialidades/especialidade.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Especialidade])],
  providers: [SeedService],
  exports: [SeedService]
})
export class SeedModule {}
