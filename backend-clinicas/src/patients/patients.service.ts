import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './create-patient.dto';
import { UpdatePatientDto } from './update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly repo: Repository<Patient>,
  ) {}

  async findAll(
    search?: string,
    options?: { skip: number; take: number },
  ): Promise<[Patient[], number]> {
    const qb = this.repo.createQueryBuilder('p');
    if (search) {
      qb.where(
        'p.name ILIKE :s OR p.email ILIKE :s OR p.phone ILIKE :s',
        { s: `%${search}%` },
      );
    }
    qb.orderBy('p.name', 'ASC');
    if (options) qb.skip(options.skip).take(options.take);
    return qb.getManyAndCount();
  }

  async findOne(id: string): Promise<Patient> {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Paciente não encontrado');
    return p;
  }

  async create(data: CreatePatientDto): Promise<Patient> {
    const exists = await this.repo.findOneBy({ cpf: data.cpf });
    if (exists) throw new BadRequestException('CPF já cadastrado');
    const patient = this.repo.create(data);
    return this.repo.save(patient);
  }

  async update(id: string, data: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id);
    Object.assign(patient, data);
    return this.repo.save(patient);
  }

  async remove(id: string): Promise<void> {
    const patient = await this.findOne(id);
    await this.repo.remove(patient);
  }
}
