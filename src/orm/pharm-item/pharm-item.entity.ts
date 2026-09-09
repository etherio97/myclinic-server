import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity('pharm_items')
export class PharmItem {
  @PrimaryColumn({
    type: 'varchar',
    length: 32,
    unique: true,
  })
  code: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Index()
  @Column({ type: 'varchar', length: 32, nullable: true })
  barcode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'jsonb' })
  units: string[];

  @Column({
    name: 'default_unit',
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  defaultUnit: string;

  @Column({
    name: 'qty_per_unit',
    type: 'int',
    default: 1,
  })
  qtyPerUnit: number;

  @Column({
    name: 'tracking_unit',
    type: 'varchar',
    length: 16,
  })
  trackingUnit: string;

  @Column({
    name: 'unit_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  unitPrice: number;

  @Column({
    name: 'each_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  eachPrice: number;

  @Column({
    name: 'min_threshold',
    type: 'int',
    default: 0,
  })
  minThreshold: number;

  @Column({
    type: 'int',
    default: 0,
  })
  stocks: number;

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
