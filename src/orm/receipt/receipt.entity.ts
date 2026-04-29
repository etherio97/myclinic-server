import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

import { Patient } from '../patient/patient.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Item } from '../item/item.entity';
import { User } from '../user/user.entity';

@Entity('receipts')
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, { nullable: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Doctor, { nullable: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column({
    type: 'enum',
    enum: ['Clinic', 'Laboratory'],
  })
  type: string;

  @Column({
    name: 'receipt_no',
    type: 'int',
    default: () => "nextval('receipt_no_seq')",
  })
  receiptNo: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_DATE' })
  date: string;

  @Column({ name: 'payment_method', type: 'varchar', length: 50 })
  paymentMethod: string;

  @Column({ type: 'enum', enum: ['Active', 'Deleted'], default: 'Active' })
  status: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  subtotal: number;

  @Column({
    name: 'discount_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  discountAmount: number;

  @Column({
    name: 'grand_total',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  grandTotal: number;

  @Column({
    type: 'jsonb',
  })
  items: Item[];

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
