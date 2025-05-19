import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidade } from './especialidade.entity';
import { CreateEspecialidadeDto } from 'src/dto/specialty/create-especialidade.dto';
import { UpdateEspecialidadeDto } from 'src/dto/specialty/update-especialidade.dto';


@Injectable()
export class EspecialidadeService {
  constructor(
    @InjectRepository(Especialidade)
    private readonly repo: Repository<Especialidade>
  ) {}

  findAll(): Promise<Especialidade[]> {
    return this.repo.find();
  }

  findOne(id: string): Promise<Especialidade> {
    return this.repo.findOneByOrFail({ id });
  }

  async create(dto: CreateEspecialidadeDto): Promise<Especialidade> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateEspecialidadeDto): Promise<Especialidade> {
    const especialidade = await this.findOne(id);
    Object.assign(especialidade, dto);
    return this.repo.save(especialidade);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Especialidade não encontrada');
    }
  }
}
