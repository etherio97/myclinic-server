import { Module } from '@nestjs/common';
import { CashflowApiController } from './cashflow-api.controller';
import { CashflowApiService } from './cashflow-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Cashflow } from 'src/orm/cashflow/cashflow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cashflow]), SharedModule],
  controllers: [CashflowApiController],
  providers: [CashflowApiService],
})
export class CashflowApiModule {}
