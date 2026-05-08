import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('logging')
export class Logging {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  userId: string;

  @Column({
    type: 'varchar',
    length: 16,
  })
  method: string;

  @Column({
    type: 'text',
  })
  endpoint: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  body: string;

  @Column({
    name: 'status_code',
    type: 'int',
  })
  statusCode: number;

  @Column({
    type: 'int',
  })
  latency: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;
}
