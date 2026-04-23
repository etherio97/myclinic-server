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

  async list(startDate?: string, endDate?: string) {
    const condition: any = {};
    if (startDate && endDate) {
      condition.date = Between(
        moment(startDate).format('yyyy-MM-DDT00:00:00.000Z'),
        moment(endDate).format('yyyy-MM-DDT23:59:59.999Z'),
      );
    }
    return this.receiptRepo
      .find({
        relations: ['patient', 'doctor', 'user'],
        where: { status: 'Active', ...condition },
        order: { createdAt: 'DESC' },
      })
      .then((receipts) =>
        receipts.map((receipt) => ({
          ...receipt,
          user: receipt.user
            ? {
                id: receipt.user.id,
                fullName: receipt.user.fullName,
                username: receipt.user.username,
                role: receipt.user.role,
                isActive: receipt.user.isActive,
                createdAt: receipt.user.createdAt,
                updatedAt: receipt.user.updatedAt,
              }
            : null,
        })),
      );
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

  async create(dto: CreateReceiptDto) {
    const receipt = this.receiptRepo.create(dto);

    const savedReceipt = await this.receiptRepo.save(receipt, {});

    return this.receiptRepo.findOne({
      where: { id: savedReceipt.id },
      relations: ['patient', 'doctor', 'user'],
    });
  }

  async update(id: string, dto: UpdateReceiptDto) {
    await this.receiptRepo.update(id, dto);

    return { message: 'Receipt updated successfully' };
  }

  async delete(id: string) {
    await this.receiptRepo.update(id, { status: 'Deleted' });

    return { message: 'Receipt deleted successfully' };
  }

  async getReceiptNo() {
    return this.receiptRepo.query(
      `SELECT nextval('receipt_no_seq') as receiptNo`,
    );
  }
}
