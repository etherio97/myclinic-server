import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmReceipt } from './pharm-receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PharmReceipt])],
})
export class PharmReceiptModule {}
