import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  dob: string;

  @Column({ default: 'Active' })
  status: 'Active' | 'Inactive';

  @Column()
  doctor: string;

  @Column({ type: 'date', nullable: true })
  lastVisit: string;

  @Column({ nullable: true })
  avatar: string;
}
