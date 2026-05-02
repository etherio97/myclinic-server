import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cashflow } from './cashflow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cashflow])],
})
export class CashflowModule {}
