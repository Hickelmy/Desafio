import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Clinica } from './clinica.entity';
import { Especialidade } from 'src/especialidades/especialidade.entity';
import { CreateClinicaDto } from 'src/dto/create-clinica.dto';
import { UpdateClinicaDto } from 'src/dto/update-clinica.dto';


@Injectable()
export class ClinicasService {
  constructor(
    @InjectRepository(Clinica)
    private readonly clinicaRepository: Repository<Clinica>,

    @InjectRepository(Especialidade)
    private readonly especialidadeRepository: Repository<Especialidade>,
  ) {}

  async findAll(search?: string): Promise<Clinica[]> {
    const where = search
      ? [
          { razaoSocial: Like(`%${search}%`) },
          { nomeFantasia: Like(`%${search}%`) },
          { cnpj: Like(`%${search}%`) },
        ]
      : {};

    return this.clinicaRepository.find({
      where,
      order: { razaoSocial: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Clinica> {
    const clinica = await this.clinicaRepository.findOne({ where: { id } });
    if (!clinica) throw new NotFoundException('Clínica não encontrada');
    return clinica;
  }

  async create(data: CreateClinicaDto): Promise<Clinica> {
    const especialidades = await this.especialidadeRepository.findByIds(data.especialidades);

    const nova = this.clinicaRepository.create({
      ...data,
      especialidades,
    });

    return this.clinicaRepository.save(nova);
  }

  async update(id: string, data: UpdateClinicaDto): Promise<Clinica> {
    const clinica = await this.findOne(id);

    const especialidades = await this.especialidadeRepository.findByIds(data.especialidades);

    Object.assign(clinica, {
      ...data,
      especialidades,
    });

    return this.clinicaRepository.save(clinica);
  }

  async remove(id: string): Promise<void> {
    const clinica = await this.findOne(id);
    await this.clinicaRepository.remove(clinica);
  }
}
