import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Doctor } from '../doctor/doctor.entity';

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'appointment_no',
    type: 'int',
    default: () => "nextval('appointment_no_seq')",
  })
  appointmentNo: number;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column({ name: 'phone_number', type: 'varchar', length: 64 })
  phoneNumber: string;

  @Column({ name: 'appointment_type', type: 'varchar', length: 64 })
  appointmentType: string;

  @Column({ name: 'appointment_case', type: 'varchar', length: 64 })
  appointmentCase: string;

  @Column({ type: 'varchar', length: 32, default: 'Booked' })
  status: string;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Doctor, { nullable: true })
  @JoinColumn({ name: 'refer_doctor_id' })
  referDoctor: Doctor;

  @Column({
    name: 'appointment_date',
    type: 'timestamptz',
  })
  appointmentDate: Date;

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
