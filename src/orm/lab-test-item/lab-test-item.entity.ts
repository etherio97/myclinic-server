import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface LabTestItemRange {
  low: number;
  high: number;
}

@Entity('lab_test_items')
export class LabTestItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 64,
  })
  category: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  subgroup: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  unit: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  range: LabTestItemRange;

  @Column({
    name: 'range_male',
    type: 'jsonb',
    nullable: true,
  })
  rangeMale: LabTestItemRange;

  @Column({
    name: 'range_female',
    type: 'jsonb',
    nullable: true,
  })
  rangeFemale: LabTestItemRange;

  @Column({
    name: 'ref_text',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  refText: string;

  @Column({
    name: 'enum_values',
    type: 'text',
    nullable: true,
  })
  enumValues: string;

  @Column({
    name: 'custom_footer',
    type: 'text',
    nullable: true,
  })
  customFooter: string;

  @Column({
    type: 'int',
    default: 0,
  })
  priority: number;

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
