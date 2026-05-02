import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateCashflowDto, UpdateCashflowDto } from './cashflow-api.dto';
import { Cashflow } from 'src/orm/cashflow/cashflow.entity';
import moment from 'moment';

@Injectable()
export class CashflowApiService {
  constructor(
    @InjectRepository(Cashflow)
    private cashflowRepo: Repository<Cashflow>,
  ) {}

  list(startDate?: string, endDate?: string) {
    const condition: any = {};
    if (startDate && endDate) {
      condition.date = Between(
        moment(startDate).format('yyyy-MM-DDT00:00:00.000Z'),
        moment(endDate).format('yyyy-MM-DDT23:59:59.999Z'),
      );
    }
    return this.cashflowRepo.find({
      relations: ['user'],
      where: condition,
      order: { date: 'DESC' },
    });
  }

  create(dto: CreateCashflowDto) {
    const cashflow = this.cashflowRepo.create(dto);

    return this.cashflowRepo.save(cashflow);
  }

  update(id: string, dto: UpdateCashflowDto) {
    return this.cashflowRepo.update(id, dto);
  }

  delete(id: string) {
    return this.cashflowRepo.delete(id);
  }
}
