import { Module } from '@nestjs/common';
import { ItemApiController } from './item-api.controller';
import { ItemApiService } from './item-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/orm/item/item.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), SharedModule],
  controllers: [ItemApiController],
  providers: [ItemApiService],
})
export class ItemApiModule {}
