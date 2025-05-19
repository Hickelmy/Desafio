// src/seed/seed.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository }    from '@nestjs/typeorm';
import { Repository }          from 'typeorm';

import { Especialidade }        from '../especialidades/especialidade.entity';
import { Doctor, DoctorStatus } from '../doctor/doctor.entity';
import { Clinica }              from '../clinicas/clinica.entity';
import { Patient }   from '../patients/patient.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Especialidade)
    private readonly especialidadeRepo: Repository<Especialidade>,

    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,

    @InjectRepository(Clinica)
    private readonly clinicaRepo: Repository<Clinica>,

    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async run(): Promise<void> {
    const especialidades = await this.seedEspecialidades();
    const doctors       = await this.seedDoctors();
    await this.seedClinicas(especialidades);
    await this.seedPatients(doctors);
  }

  private async seedEspecialidades(): Promise<Especialidade[]> {
    if (await this.especialidadeRepo.count() > 0) {
      this.logger.log('➡ Especialidades já existem, pulando seed.');
      return this.especialidadeRepo.find();
    }

    const nomes = [
      'Cardiologia', 'Pediatria', 'Ortopedia',
      'Ginecologia', 'Dermatologia', 'Urologia', 'Oncologia'
    ];

    const entidades = this.especialidadeRepo.create(
      nomes.map(nome => ({ nome }))
    );
    const salvos = await this.especialidadeRepo.save(entidades);
    this.logger.log(`✅ Inseridas ${salvos.length} especialidades.`);
    return salvos;
  }

  private async seedDoctors(): Promise<Doctor[]> {
    if (await this.doctorRepo.count() > 0) {
      this.logger.log('➡ Médicos já existem, pulando seed.');
      return this.doctorRepo.find();
    }

    const dados: Partial<Doctor>[] = [
      {
        name:      'Dr. Ana Silva',
        crm:       '12345',
        specialty: 'Cardiologia',
        phone:     '1111-1111',
        email:     'ana@clinica.com',
        status:    DoctorStatus.ATIVO
      },
      {
        name:      'Dr. Bruno Costa',
        crm:       '23456',
        specialty: 'Pediatria',
        phone:     '2222-2222',
        email:     'bruno@clinica.com',
        status:    DoctorStatus.ATIVO
      },
      {
        name:      'Dr. Carla Ramos',
        crm:       '34567',
        specialty: 'Dermatologia',
        phone:     '3333-3333',
        email:     'carla@clinica.com',
        status:    DoctorStatus.INATIVO
      }
    ];

    const entidades = this.doctorRepo.create(dados);
    const salvos = await this.doctorRepo.save(entidades);
    this.logger.log(`✅ Inseridos ${salvos.length} médicos.`);
    return salvos;
  }

  /**
   * Insere clínicas de exemplo, associando 2–3 especialidades a cada.
   */
  private async seedClinicas(especialidades: Especialidade[]): Promise<Clinica[]> {
    if (await this.clinicaRepo.count() > 0) {
      this.logger.log('➡ Clínicas já existem, pulando seed.');
      return this.clinicaRepo.find();
    }

    const hoje = new Date().toISOString().slice(0, 10);
    const dados: Partial<Clinica>[] = [
      {
        razaoSocial:   'Alpha Saúde Ltda.',
        nomeFantasia:  'Clínica Alpha',
        cnpj:          '00.000.000/0001-00',
        regional:      'Norte',
        dataInauguracao: hoje,
        ativa:         true,
        especialidades: [especialidades[0], especialidades[1]]
      },
      {
        razaoSocial:   'Beta Medical SA',
        nomeFantasia:  'Clínica Beta',
        cnpj:          '11.111.111/0001-11',
        regional:      'Sul',
        dataInauguracao: hoje,
        ativa:         true,
        especialidades: [especialidades[2], especialidades[3]]
      },
      {
        razaoSocial:   'Gama Saúde e Bem-Estar',
        nomeFantasia:  'Clínica Gama',
        cnpj:          '22.222.222/0001-22',
        regional:      'Leste',
        dataInauguracao: hoje,
        ativa:         false,
        especialidades: [especialidades[4], especialidades[5], especialidades[6]]
      }
    ];

    const entidades = this.clinicaRepo.create(dados);
    const salvos = await this.clinicaRepo.save(entidades);
    this.logger.log(`✅ Inseridas ${salvos.length} clínicas.`);
    return salvos;
  }

  private async seedPatients(doctors: Doctor[]): Promise<Patient[]> {
    if (await this.patientRepo.count() > 0) {
      this.logger.log('➡ Pacientes já existem, pulando seed.');
      return this.patientRepo.find();
    }

    if (doctors.length === 0) {
      doctors = await this.doctorRepo.find();
    }

    const dados: Partial<Patient>[] = [
      {
        name:  'Alice Moraes',
        cpf:   '123.456.789-00',
        phone: '4444-4444',
        email: 'alice@ex.com',
        dob:   '1990-01-01',
        status: "Inactive",
        doctor: doctors[0].id,
        lastVisit: null,
        avatar:    null
      },
      {
        name:  'Bruno Lima',
        cpf:   '987.654.321-00',
        phone: '5555-5555',
        email: 'bruno@ex.com',
        dob:   '1985-05-12',
        status: "Active",
        doctor: doctors[1]?.id ?? doctors[0].id,
        lastVisit: null,
        avatar:    null
      },
      {
        name:  'Carla Souza',
        cpf:   '111.222.333-44',
        phone: '6666-6666',
        email: 'carla@ex.com',
        dob:   '1978-08-30',
        status: "Active",
        doctor: doctors[2]?.id ?? doctors[0].id,
        lastVisit: null,
        avatar:    null
      }
    ];

    const entidades = this.patientRepo.create(dados);
    const salvos = await this.patientRepo.save(entidades);
    this.logger.log(`✅ Inseridos ${salvos.length} pacientes.`);
    return salvos;
  }
}
