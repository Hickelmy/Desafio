import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';

import { Clinica } from './clinica.entity';
import { Especialidade } from 'src/especialidades/especialidade.entity';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginatedResult } from 'src/dto/paginated-result.interface';
import { CreateClinicaDto } from 'src/dto/clinic/create-clinica.dto';
import { UpdateClinicaDto } from 'src/dto/clinic/update-clinica.dto';

@Injectable()
export class ClinicasService {
  constructor(
    @InjectRepository(Clinica)
    private readonly clinicaRepository: Repository<Clinica>,

    @InjectRepository(Especialidade)
    private readonly especialidadeRepository: Repository<Especialidade>,
  ) {}

  async findAll(
    dto: PaginationDto,
  ): Promise<PaginatedResult<Clinica>> {
    const { search, page, limit } = dto;
    const skip = (page - 1) * limit;
    const take = limit;

    const where = search
      ? [
          { razaoSocial: Like(`%${search}%`) },
          { nomeFantasia: Like(`%${search}%`) },
          { cnpj: Like(`%${search}%`) },
        ]
      : {};

    const [items, total] = await this.clinicaRepository.findAndCount({
      where,
      skip,
      take,
      order: { razaoSocial: 'ASC' },
      relations: ['especialidades'],  
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Clinica> {
    const clinica = await this.clinicaRepository.findOne({
      where: { id },
      relations: ['especialidades'],
    });

    if (!clinica) {
      throw new NotFoundException('Clínica não encontrada');
    }

    return clinica;
  }

  async create(data: CreateClinicaDto): Promise<Clinica> {
    const existente = await this.clinicaRepository.findOneBy({
      cnpj: data.cnpj,
    });
    if (existente) {
      throw new BadRequestException(
        'Já existe uma clínica cadastrada com este CNPJ.',
      );
    }

    const especialidades = await this.buscarEspecialidadesValidas(
      data.especialidades,
    );

    const nova = this.clinicaRepository.create({
      ...data,
      especialidades,
    });

    return this.clinicaRepository.save(nova);
  }

  async update(id: string, data: UpdateClinicaDto): Promise<Clinica> {
    const clinica = await this.findOne(id);
    const especialidades = await this.buscarEspecialidadesValidas(
      data.especialidades,
    );

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

  private async buscarEspecialidadesValidas(
    raw: any[] = [],
  ): Promise<Especialidade[]> {
    const ids: string[] = raw
      .map((e) => (typeof e === 'string' ? e : e?.id))
      .filter(Boolean);

    const encontrados = await this.especialidadeRepository.find({
      where: { id: In(ids) },
    });

    if (encontrados.length !== ids.length) {
      throw new BadRequestException(
        'Uma ou mais especialidades são inválidas',
      );
    }

    return encontrados;
  }


   async count(): Promise<number> {
    return this.especialidadeRepository.count();
  }

}
