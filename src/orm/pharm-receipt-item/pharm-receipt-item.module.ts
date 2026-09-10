import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmReceiptItem } from './pharm-receipt-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PharmReceiptItem])],
})
export class PharmReceiptItemModule {}
