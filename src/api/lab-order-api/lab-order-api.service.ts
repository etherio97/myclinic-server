import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, Not } from 'typeorm';
import { CreateLabOrderDto, UpdateLabOrderDto } from './lab-order-api.dto';
import { LabOrder } from 'src/orm/lab-order/lab-order.entity';
import moment from 'moment';

@Injectable()
export class LabOrderApiService {
  constructor(
    @InjectRepository(LabOrder)
    private labOrderRepo: Repository<LabOrder>,
  ) {}

  list(startDate?: string, endDate?: string, status?: string) {
    const condition: any = {};
    if (startDate && endDate) {
      condition.collectedDate = Between(
        moment(startDate).format('yyyy-MM-DDT00:00:00.000Z'),
        moment(endDate).format('yyyy-MM-DDT23:59:59.999Z'),
      );
    }
    if (status) {
      condition.status = status;
    } else {
      condition.status = Not('Deleted');
    }

    return this.labOrderRepo.find({
      relations: ['patient', 'doctor', 'user'],
      where: { ...condition },
      order: { collectedDate: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.labOrderRepo.findOne({
      where: { id },
      relations: ['patient', 'doctor', 'user'],
    });
  }

  create(dto: CreateLabOrderDto) {
    const item = this.labOrderRepo.create(dto);

    return this.labOrderRepo.save(item);
  }

  async update(id: string, dto: UpdateLabOrderDto) {
    await this.labOrderRepo.update(id, dto);

    return { message: 'Lab Order updated successfully' };
  }

  async delete(id: string) {
    await this.labOrderRepo.update(id, { status: 'Deleted' });

    return { message: 'Lab Order deleted successfully' };
  }
}
