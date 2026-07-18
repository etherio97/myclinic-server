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
import { LabOrder } from '../lab-order/lab-order.entity';

@Entity('lab_results')
export class LabResult {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'result_no',
    type: 'int',
    default: () => "nextval('lab_result_no_seq')",
  })
  resultNo: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => LabOrder)
  @JoinColumn({ name: 'lab_order_id' })
  order: LabOrder;

  @Column({
    type: 'varchar',
    length: 32,
    default: 'Active',
  })
  status: string;

  @Column({
    name: 'reported_date',
    type: 'timestamptz',
  })
  reportedDate: Date;

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
