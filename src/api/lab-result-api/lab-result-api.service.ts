import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, Not } from 'typeorm';
import { CreateLabResultDto, UpdateLabResultDto } from './lab-result-api.dto';
import moment from 'moment';
import { LabResult } from 'src/orm/lab-result/lab-result.entity';

@Injectable()
export class LabResultApiService {
  constructor(
    @InjectRepository(LabResult)
    private labResultRepo: Repository<LabResult>,
  ) {}

  list(startDate?: string, endDate?: string, status?: string) {
    const condition: any = {};
    if (startDate && endDate) {
      condition.reportedDate = Between(
        moment(startDate).format('yyyy-MM-DDT00:00:00.000Z'),
        moment(endDate).format('yyyy-MM-DDT23:59:59.999Z'),
      );
    }
    if (status) {
      condition.status = status;
    } else {
      condition.status = Not('Deleted');
    }

    return this.labResultRepo.find({
      relations: ['order', 'order.patient', 'user'],
      where: { ...condition },
      order: { reportedDate: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.labResultRepo.findOne({
      where: { id },
      relations: ['order', 'order.patient', 'user'],
    });
  }

  create(dto: CreateLabResultDto) {
    const item = this.labResultRepo.create(dto);

    return this.labResultRepo.save(item);
  }

  async update(id: string, dto: UpdateLabResultDto) {
    await this.labResultRepo.update(id, dto);

    return { message: 'Lab Result updated successfully' };
  }

  async delete(id: string) {
    await this.labResultRepo.update(id, { status: 'Deleted' });

    return { message: 'Lab Result deleted successfully' };
  }
}
