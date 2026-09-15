import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePharmItemDto, UpdatePharmItemDto } from './pharm-item-api.dto';
import { PharmItem } from 'src/orm/pharm-item/pharm-item.entity';

@Injectable()
export class PharmItemApiService {
  constructor(
    @InjectRepository(PharmItem)
    private pharmItemRepo: Repository<PharmItem>,
  ) {}

  list(
    {
      name,
      code,
      barcode,
    }: {
      name?: string;
      code?: string;
      barcode?: string;
    },
    showAll = true,
  ) {
    const qb = this.pharmItemRepo.createQueryBuilder('pharm_item');

    if (name) {
      qb.andWhere('LOWER(pharm_item.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }
    if (code) {
      qb.andWhere('LOWER(pharm_item.code) LIKE LOWER(:code)', {
        code: `${code}%`,
      });
    }
    if (barcode) {
      qb.andWhere('pharm_item.barcode = :barcode', { barcode });
    }
    if (!showAll) {
      qb.andWhere('pharm_item.status = :status', { status: 'Active' });
    }

    qb.orderBy('pharm_item.name', 'ASC');

    return qb.getMany();
  }

  findOne(code: string) {
    return this.pharmItemRepo.findOneBy({ code });
  }

  async create(dto: CreatePharmItemDto) {
    const item = this.pharmItemRepo.create(dto);

    await this.pharmItemRepo.insert(item);

    return { message: 'Item added successfully' };
  }

  async update(code: string, dto: UpdatePharmItemDto) {
    await this.pharmItemRepo.update(code, dto);

    return { message: 'Item updated successfully' };
  }

  async delete(code: string) {
    await this.pharmItemRepo.delete(code);

    return { message: 'Item deleted successfully' };
  }

  increment(code: string, column: string, value: number) {
    return this.pharmItemRepo.increment({ code }, column, value);
  }

  decrement(code: string, column: string, value: number) {
    return this.pharmItemRepo.decrement({ code }, column, value);
  }
}
