import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, In } from 'typeorm';
import { CreateExpenseDto, UpdateExpenseDto } from './expense-api.dto';
import moment from 'moment';
import { Expense } from 'src/orm/expense/expense.entity';

@Injectable()
export class ExpenseApiService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepo: Repository<Expense>,
  ) {}

  async list(startDate?: string, endDate?: string, category?: string[]) {
    const condition: any = {};
    if (startDate && endDate) {
      condition.date = Between(
        moment(startDate).format('yyyy-MM-DDT00:00:00.000Z'),
        moment(endDate).format('yyyy-MM-DDT23:59:59.999Z'),
      );
    }
    if (category && category.length) {
      condition.category = In(category);
    }
    return this.expenseRepo.find({
      relations: ['user'],
      where: condition,
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string) {
    return this.expenseRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async create(dto: CreateExpenseDto) {
    const receipt = this.expenseRepo.create(dto);

    return this.expenseRepo.save(receipt);
  }

  async update(id: string, dto: UpdateExpenseDto) {
    await this.expenseRepo.update(id, dto);

    return { message: 'Expense updated successfully' };
  }

  async delete(id: string) {
    await this.expenseRepo.delete(id);

    return { message: 'Expense deleted successfully' };
  }
}
