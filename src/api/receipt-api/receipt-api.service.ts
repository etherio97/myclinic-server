import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateReceiptDto, UpdateReceiptDto } from './receipt-api.dto';
import { Receipt } from 'src/orm/receipt/receipt.entity';
import moment from 'moment';

@Injectable()
export class ReceiptApiService {
  constructor(
    @InjectRepository(Receipt)
    private receiptRepo: Repository<Receipt>,
  ) {}

  async list(startDate?: string, endDate?: string, type?: string) {
    const condition: any = {};
    if (startDate && endDate) {
      condition.date = Between(
        moment(startDate).format('yyyy-MM-DDT00:00:00.000Z'),
        moment(endDate).format('yyyy-MM-DDT23:59:59.999Z'),
      );
    }
    if (type) {
      condition.type = type;
    }
    return this.receiptRepo.find({
      relations: ['patient', 'doctor', 'user'],
      where: { status: 'Active', ...condition },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    return this.receiptRepo.findOne({
      where: { id },
      relations: ['patient', 'doctor', 'user'],
    });
  }

  async findPatientReceipt(patientId: any) {
    return this.receiptRepo.find({
      where: { patient: { id: patientId }, status: 'Active' },
      order: { createdAt: 'DESC' },
      relations: ['patient', 'doctor', 'user'],
    });
  }

  async create(dto: any) {
    const receipt = this.receiptRepo.create(dto);

    return this.receiptRepo.save(receipt);
  }

  async update(id: string, dto: any) {
    await this.receiptRepo.update(id, dto);

    return { message: 'Receipt updated successfully' };
  }

  async delete(id: string) {
    await this.receiptRepo.update(id, { status: 'Deleted' });

    return { message: 'Receipt deleted successfully' };
  }
}
