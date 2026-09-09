import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import {
  CreatePharmPurchaseDto,
  UpdatePharmPurchaseDto,
} from './pharm-purchase-api.dto';
import { PharmPurchase } from 'src/orm/pharm-purchase/pharm-purchase.entity';
import moment from 'moment';

@Injectable()
export class PharmPurchaseApiService {
  constructor(
    @InjectRepository(PharmPurchase)
    private pharmPurchaseRepo: Repository<PharmPurchase>,
  ) {}

  list(startDate?: string, endDate?: string) {
    const condition: any = {};
    if (startDate && endDate) {
      condition.purchasedDate = Between(
        moment(startDate).format('yyyy-MM-DDT00:00:00.000Z'),
        moment(endDate).format('yyyy-MM-DDT23:59:59.999Z'),
      );
    }
    return this.pharmPurchaseRepo.find({
      relations: ['item'],
      where: { ...condition },
      order: {
        purchasedDate: 'DESC',
        item: { name: 'DESC' },
      },
    });
  }

  findOne(id: string) {
    return this.pharmPurchaseRepo.findOne({
      where: { id },
      relations: ['item'],
    });
  }

  async create(dto: CreatePharmPurchaseDto) {
    const item = this.pharmPurchaseRepo.create(dto);

    await this.pharmPurchaseRepo.save(item);

    return { message: 'Item added successfully' };
  }

  async update(id: string, dto: UpdatePharmPurchaseDto) {
    await this.pharmPurchaseRepo.update(id, dto);

    return { message: 'Item updated successfully' };
  }

  async delete(id: string) {
    await this.pharmPurchaseRepo.delete(id);

    return { message: 'Item deleted successfully' };
  }
}
