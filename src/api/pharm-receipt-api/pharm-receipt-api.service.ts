import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import {
  CreatePharmReceiptDto,
  UpdatePharmReceiptDto,
} from './pharm-receipt-api.dto';
import moment from 'moment';
import { PharmReceipt } from 'src/orm/pharm-receipt/pharm-receipt.entity';

@Injectable()
export class PharmReceiptApiService {
  constructor(
    @InjectRepository(PharmReceipt)
    private receiptRepo: Repository<PharmReceipt>,
  ) {}

  async list(startDate?: string, endDate?: string) {
    const condition: any = {};
    if (startDate && endDate) {
      condition.date = Between(
        moment(startDate).format('yyyy-MM-DDT00:00:00.000Z'),
        moment(endDate).format('yyyy-MM-DDT23:59:59.999Z'),
      );
    }

    return this.receiptRepo.find({
      relations: ['patient', 'user'],
      where: { status: 'Active', ...condition },
      order: { date: 'DESC' },
    });
  }

  async listDeletedReceipts(startDate?: string, endDate?: string) {
    const condition: any = {};
    if (startDate && endDate) {
      condition.date = Between(
        moment(startDate).format('yyyy-MM-DDT00:00:00.000Z'),
        moment(endDate).format('yyyy-MM-DDT23:59:59.999Z'),
      );
    }
    return this.receiptRepo.find({
      relations: ['patient', 'doctor', 'user'],
      where: { status: 'Deleted', ...condition },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    return this.receiptRepo.findOne({
      where: { id },
      relations: ['patient', 'user'],
    });
  }

  async findPatientReceipt(patientId: any) {
    return this.receiptRepo.find({
      where: { patient: { id: patientId }, status: 'Active' },
      order: { createdAt: 'DESC' },
      relations: ['patient', 'user'],
    });
  }

  create(dto: CreatePharmReceiptDto) {
    const receipt = this.receiptRepo.create(dto);

    return this.receiptRepo.save(receipt);
  }

  async update(id: string, dto: UpdatePharmReceiptDto) {
    await this.receiptRepo.update(id, dto);

    return { message: 'Receipt updated successfully' };
  }

  async delete(id: string) {
    await this.receiptRepo.update(id, { status: 'Deleted' });

    return { message: 'Receipt deleted successfully' };
  }
}
