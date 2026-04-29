import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'patient_no',
    type: 'int',
    default: () => "nextval('patient_no_seq')",
  })
  patientNo: number;

  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullName: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @Column({ name: 'ssb_number', type: 'varchar', length: 32, nullable: true })
  ssbNumber: string;

  @Column({ name: 'nrc_number', type: 'varchar', length: 32, nullable: true })
  nrcNumber: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 20,
  })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;
}
