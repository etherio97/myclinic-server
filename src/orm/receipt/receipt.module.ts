import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt])],
})
export class ReceiptModule {}
