import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PharmItem } from '../pharm-item/pharm-item.entity';
import { Item } from '../item/item.entity';
import { PharmReceipt } from '../pharm-receipt/pharm-receipt.entity';

@Entity('pharm_receipt_items')
export class PharmReceiptItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PharmReceipt)
  @JoinColumn({ name: 'receipt_id' })
  receipt: PharmReceipt;

  @ManyToOne(() => PharmItem)
  @JoinColumn({ name: 'item_code' })
  item: Item;

  @Column({
    type: 'varchar',
    length: 50,
  })
  unit: string;

  @Column({
    type: 'int',
  })
  quantity: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;
}
