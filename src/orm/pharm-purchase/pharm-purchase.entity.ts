import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PharmItem } from '../pharm-item/pharm-item.entity';

@Entity('pharm_purchases')
export class PharmPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'purchased_date',
    type: 'timestamptz',
  })
  purchasedDate: string;

  @ManyToOne(() => PharmItem)
  @JoinColumn({ name: 'pharm_item_code' })
  item: PharmItem;

  @Column({
    type: 'varchar',
    length: 32,
  })
  unit: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  supplier: string;

  @Column({
    name: 'expiry_date',
    type: 'timestamptz',
    nullable: true,
  })
  expiryDate: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  cost: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  discount: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  total: number;

  @Column({
    type: 'enum',
    enum: ['Active', 'Archive'],
    default: 'Active',
  })
  status: string;

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
