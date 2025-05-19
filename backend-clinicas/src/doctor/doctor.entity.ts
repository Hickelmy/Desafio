import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum DoctorStatus {
  ATIVO = 'Ativo',
  INATIVO = 'Inativo',
}

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20, unique: true })
  crm: string;

  @Column({ length: 100 })
  specialty: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: 'enum', enum: DoctorStatus, default: DoctorStatus.ATIVO })
  status: DoctorStatus;
}
