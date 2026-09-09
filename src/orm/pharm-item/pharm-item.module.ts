import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmItem } from './pharm-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PharmItem])],
})
export class PharmItemModule {}
