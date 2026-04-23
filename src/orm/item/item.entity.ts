import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // Medicine | Service | Procedure
  @Column({ name: 'item_type', type: 'varchar', length: 50 })
  itemType: string;

  // Antibiotics | Laboratory | General
  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  // Cost to clinic
  @Column({
    name: 'base_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  basePrice: number;

  // Selling price to patient
  @Column({
    name: 'selling_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  sellingPrice: number;

  @Index()
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

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
