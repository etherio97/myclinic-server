import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Doctor } from '../doctor/doctor.entity';
import { LabTestItem } from '../lab-test-item/lab-test-item.entity';
import { User } from '../user/user.entity';

@Entity('lab_orders')
export class LabOrder {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'order_no',
    type: 'int',
    default: () => "nextval('lab_order_no_seq')",
  })
  orderNo: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Doctor, { nullable: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column({
    type: 'varchar',
    length: 32,
    default: 'Pending',
  })
  status: string;

  @Column({
    name: 'refer_centre',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  referCentre: string;

  @Column({
    name: 'collected_date',
    type: 'timestamptz',
  })
  collectedDate: Date;

  @Column({
    name: 'received_date',
    type: 'timestamptz',
  })
  receivedDate: Date;

  @Column({
    type: 'jsonb',
  })
  items: LabTestItem[];

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
