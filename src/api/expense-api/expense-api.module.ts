import { Module } from '@nestjs/common';
import { ExpenseApiController } from './expense-api.controller';
import { ExpenseApiService } from './expense-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Expense } from 'src/orm/expense/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), SharedModule],
  controllers: [ExpenseApiController],
  providers: [ExpenseApiService],
})
export class ExpenseApiModule {}
