import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto, UpdateItemDto } from './item-api.dto';
import { Item } from 'src/orm/item/item.entity';

@Injectable()
export class ItemApiService {
  constructor(
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
  ) {}

  list({
    name,
    itemType,
    category,
  }: {
    name?: string;
    itemType?: string;
    category?: string;
  }) {
    const qb = this.itemRepo.createQueryBuilder('item');

    if (name) {
      qb.andWhere('LOWER(item.name) LIKE LOWER(:name)', { name: `%${name}%` });
    }
    if (itemType) {
      qb.andWhere('item.itemType = :itemType', { itemType });
    }
    if (category) {
      qb.andWhere('item.category = :category', { category });
    }

    qb.orderBy('created_at', 'DESC');

    return qb.getMany();
  }

  findOne(id: string) {
    return this.itemRepo.findOneBy({ id });
  }

  async create(dto: CreateItemDto) {
    const item = this.itemRepo.create(dto);

    await this.itemRepo.save(item);

    return { message: 'Item added successfully' };
  }

  async update(id: string, dto: UpdateItemDto) {
    await this.itemRepo.update(id, dto);

    return { message: 'Item updated successfully' };
  }

  async delete(id: string) {
    await this.itemRepo.delete(id);

    return { message: 'Item deleted successfully' };
  }

  getCategories(type?: string) {
    const qb = this.itemRepo
      .createQueryBuilder('item')
      .distinctOn(['item.category'])
      .select('item.category');
    if (type) {
      qb.where({ itemType: type });
    }
    return qb.getMany();
  }
}
