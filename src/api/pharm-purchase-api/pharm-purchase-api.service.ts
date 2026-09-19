import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
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

  list(
    startDate?: string,
    endDate?: string,
    status?: string,
    sortBy?: string,
    itemCode?: string,
    itemName?: string,
  ) {
    const condition: any = {},
      order: any = {};
    if (startDate && endDate) {
      condition.purchasedDate = Between(
        moment(startDate).format('yyyy-MM-DDT00:00:00.000Z'),
        moment(endDate).format('yyyy-MM-DDT23:59:59.999Z'),
      );
    }
    if (status) {
      condition.status = status;
    }
    if (itemCode) {
      condition.item = { code: itemCode };
    }
    if (itemName) {
      condition.item = { name: ILike(`${itemName}%`) };
    }
    switch (sortBy) {
      case 'exp:asc':
        order.expiryDate = 'ASC';
        break;
      case 'date:desc':
        order.purchasedDate = 'DESC';
        order.item = { name: 'DESC' };
        break;
      case 'name:asc':
        order.item = { name: 'ASC' };
        break;
    }
    return this.pharmPurchaseRepo.find({
      relations: ['item'],
      where: { ...condition },
      order,
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
