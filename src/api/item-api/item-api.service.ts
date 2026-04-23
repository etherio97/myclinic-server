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

  async list({
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

    return qb.getMany();
  }

  async findOne(id: string) {
    return this.itemRepo.findOneBy({ id });
  }

  async create(dto: CreateItemDto) {
    const item = this.itemRepo.create(dto);

    await this.itemRepo.save(item);

    return { message: 'Item added successfully' };
  }

  async update(id: string, dto: UpdateItemDto) {
    this.itemRepo.update(id, dto);

    return { message: 'Item updated successfully' };
  }

  async delete(id: string) {
    this.itemRepo.delete(id);

    return { message: 'Item deleted successfully' };
  }

  async getCategories() {
    return this.itemRepo.query('SELECT DISTINCT category FROM items');
  }

  async getItemTypes() {
    return this.itemRepo.query('SELECT DISTINCT item_type FROM items');
  }
}
