import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('cashflow')
export class Cashflow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_DATE',
  })
  date: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  category: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    name: 'cash-out',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  cashIn: number;

  @Column({
    name: 'cash-in',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  cashOut: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  remarks: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
