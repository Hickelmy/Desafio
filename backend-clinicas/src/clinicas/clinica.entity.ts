import { Especialidade } from 'src/especialidades/especialidade.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('clinicas')
export class Clinica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeFantasia: string;

  @Column({ unique: true, length: 18 })
  cnpj: string;

  @Column()
  regional: string;

  @Column({ type: 'date' })
  dataInauguracao: string;

  @Column({ default: true })
  ativa: boolean;

  @ManyToMany(() => Especialidade, { eager: true, cascade: true })
  @JoinTable({
    name: 'clinica_especialidades',
    joinColumn: { name: 'clinica_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'especialidade_id', referencedColumnName: 'id' },
  })
  especialidades: Especialidade[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
