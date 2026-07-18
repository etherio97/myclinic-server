import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateLabTestItemDto,
  UpdateLabTestItemDto,
} from './lab-test-item-api.dto';
import { LabTestItem } from 'src/orm/lab-test-item/lab-test-item.entity';

@Injectable()
export class LabTestItemApiService {
  constructor(
    @InjectRepository(LabTestItem)
    private labTestItemRepo: Repository<LabTestItem>,
  ) {}

  list(name: string, category: string, subgroup: string, updatedAt: boolean) {
    const qb = this.labTestItemRepo.createQueryBuilder('item');

    if (name) {
      qb.andWhere('LOWER(item.name) LIKE LOWER(:name)', { name: `%${name}%` });
    }
    if (category) {
      qb.andWhere('item.category = :category', { category });
    }
    if (subgroup) {
      qb.andWhere('item.subgroup = :subgroup', { subgroup });
    }

    if (updatedAt) {
      qb.orderBy('updated_at', 'DESC');
    } else {
      qb.addOrderBy('category', 'ASC')
        .addOrderBy('subgroup', 'ASC')
        .addOrderBy('priority', 'DESC');
    }

    return qb.getMany();
  }

  findOne(id: string) {
    return this.labTestItemRepo.findOneBy({ id });
  }

  async create(dto: CreateLabTestItemDto) {
    const item = this.labTestItemRepo.create(dto);

    await this.labTestItemRepo.save(item);

    return { message: 'Lab Test Item added successfully' };
  }

  async update(id: string, dto: UpdateLabTestItemDto) {
    await this.labTestItemRepo.update(id, dto);

    return { message: 'Lab Test Item updated successfully' };
  }

  async delete(id: string) {
    await this.labTestItemRepo.delete(id);

    return { message: 'Lab Test Item deleted successfully' };
  }

  getCategories() {
    const qb = this.labTestItemRepo
      .createQueryBuilder('item')
      .distinctOn(['item.category'])
      .select('item.category');

    return qb.getMany();
  }

  getSubGroups(category?: string) {
    const qb = this.labTestItemRepo
      .createQueryBuilder('item')
      .distinctOn(['item.subgroup'])
      .select('item.subgroup');

    if (category) {
      qb.where({ category });
    }

    return qb.getMany();
  }
}
