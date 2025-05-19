// src/doctor/doctor.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from 'src/dto/doctor/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/doctor/update-doctor.dto';
import { ListDoctorDto } from 'src/dto/doctor/list-doctor.dto';


export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly repo: Repository<Doctor>,
  ) {}

  async create(dto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.repo.create(dto);
    return this.repo.save(doctor);
  }

  async findOne(id: string): Promise<Doctor> {
    const doc = await this.repo.findOne({ where: { id } });
    if (!doc) throw new NotFoundException(`Médico ${id} não encontrado`);
    return doc;
  }

  async update(id: string, dto: UpdateDoctorDto): Promise<Doctor> {
    const doc = await this.findOne(id);
    Object.assign(doc, dto);
    return this.repo.save(doc);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Médico ${id} não encontrado`);
  }

  async findAll(query: ListDoctorDto): Promise<PaginatedResult<Doctor>> {
    const { search, page = 1, limit = 10 } = query;

    const qb = this.repo.createQueryBuilder('doctor');

    if (search) {
      const term = `%${search}%`;
      qb.where(
        'doctor.name ILIKE :term OR doctor.crm ILIKE :term OR doctor.specialty ILIKE :term',
        { term },
      );
    }

    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return { data, total, page, limit };
  }



   async count(): Promise<number> {
    return this.repo.count();
  }

  async getRandom(): Promise<Doctor> {
    const total = await this.repo.count();
    if (total === 0) throw new NotFoundException('Nenhum médico cadastrado');
    const offset = Math.floor(Math.random() * total);
    const [doc] = await this.repo.createQueryBuilder('d')
      .offset(offset)
      .limit(1)
      .getMany();
    return doc;
  }

}
